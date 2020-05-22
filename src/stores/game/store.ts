import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens, Getter } from "monocle-ts";
import { some, none } from "fp-ts/es6/Option";
import { createStore, filterEvery } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { datumEither as DE } from "@nll/datum";
import { caseFn, asyncReducerFactory } from "@nll/dux/Reducers";
import { isBefore, parseISO, compareDesc, endOfToday } from "date-fns";
import { createSelector } from "reselect";
import { from } from "rxjs";
import { ajax } from "rxjs/ajax";

import { GameState, Game, Notice, Save, GameAndSave } from "./models";
import { logger, createStateRestore } from "../../libs/dux";
import { eqInsensitive } from "../../libs/strings";
import { INITIAL_GAME_STATE, badNotice, goodNotice } from "./consts";
import { GamesCodec, SaveStateCodec } from "./validators";
import { asyncExhaustMap } from "@nll/dux/Operators";
import { mapDecode } from "../../libs/ajax";
import { settingsStore, failureBuzz, successBuzz } from "stores/settings";

/** Setup Store */
const action = actionCreatorFactory("GAME_STORE");

export const gameStore = createStore(INITIAL_GAME_STATE).addMetaReducers(
  logger()
);
export const useGameStore = useStoreFactory(gameStore, useState, useEffect);
export const useGameDispatch = useDispatchFactory(gameStore, useCallback);

/** Lenses */
const rootProp = Lens.fromProp<GameState>();

export const notificationL = rootProp("notification");

export const gamesL = rootProp("games");
export const gameGetter = (id: string) =>
  new Getter((de: DE.DatumEither<Error, Record<string, Game>>) =>
    DE.chain((r: Record<string, Game>) => DE.fromNullable<Error, Game>(r[id]))(
      de
    )
  );
export const gameG = (id: string) => gamesL.composeGetter(gameGetter(id));

export const savesL = rootProp("saves");
export const saveGNN = (id: string) =>
  Lens.fromNullableProp<GameState["saves"]>()(id, { id, found: [] });
export const saveG = (id: string) => savesL.compose(saveGNN(id));

const foundL = Lens.fromProp<Save>()("found");
export const foundG = (id: string) => saveG(id).composeLens(foundL);

/** Notifications*/
export const setNotification = action.simple<Notice>("SET_NOTIFICATION");
const clearNotificationRaw = action.simple("CLEAR_NOTIFICATION");
export const clearNotification = clearNotificationRaw(undefined);
const setNotificationCase = caseFn(setNotification, (s: GameState, { value }) =>
  notificationL.set(some(value))(s)
);
const clearNotificationCase = caseFn(
  clearNotificationRaw,
  notificationL.set(none)
);
gameStore.addReducers(setNotificationCase, clearNotificationCase);

/** Submit Word */
export const submitWord = action.simple<{ id: string; guess: string }>(
  "SUBMIT_WORD"
);
const submitWordRunEvery = filterEvery(
  submitWord,
  (s: GameState, { value: { id, guess } }) => {
    const game = gameG(id).get(s);
    const save = saveG(id).get(s);

    console.log("Hello");

    if (!DE.isSuccess(game)) {
      settingsStore.dispatch(failureBuzz);
      return setNotification(badNotice("No game!"));
    }

    if (!game.value.right.dictionary.some(eqInsensitive(guess))) {
      settingsStore.dispatch(failureBuzz);
      return from([setNotification(badNotice(`${guess}`.toUpperCase()))]);
    }

    if (save.found.some(eqInsensitive(guess))) {
      settingsStore.dispatch(failureBuzz);
      return from([setNotification(badNotice("Already Found"))]);
    }

    settingsStore.dispatch(successBuzz);
    return from([
      setNotification(goodNotice(`${guess}`.toUpperCase())),
      foundWord({ id, guess }),
    ]);
  }
);
gameStore.addRunEverys(submitWordRunEvery);

/** Found Word */
const foundWord = action.simple<{ id: string; guess: string }>("FOUND_WORD");
const foundWordCase = caseFn(
  foundWord,
  (s: GameState, { value: { id, guess } }) =>
    foundG(id).modify((found) => found.concat(guess))(s)
);
gameStore.addReducers(foundWordCase);

/** Get  Games */
const getGames = action.async<string, Record<string, Game>, Error>("GET_GAMES");
const getGamesReducer = asyncReducerFactory(getGames, gamesL);
const getGamesHandler = (url: string) =>
  ajax.getJSON(url).pipe(mapDecode(GamesCodec));
const getGamesRunOnce = asyncExhaustMap(getGames, getGamesHandler);
gameStore
  .addReducers(getGamesReducer)
  .addRunOnces(getGamesRunOnce)
  .dispatch(getGames.pending("/games.json"));

/** Save Storage - Migrate to simple wireup in one week */
const { wireupActions } = createStateRestore<SaveStateCodec, GameState>(
  SaveStateCodec,
  "GAME_STORE/SAVES"
);
wireupActions(gameStore, [foundWord]);

/** Selectors */
export const selectGameAndSaveById = (id: string) =>
  createSelector(gameG(id).get, saveG(id).get, (game, save) =>
    DE.map((game: Game) => ({ game, save }))(game)
  );

export const selectAvailableGames = createSelector(
  gamesL.get,
  savesL.get,
  (gamesDE, saves) => {
    return DE.map((games: Record<string, Game>) =>
      Object.keys(games)
        .map((key) => games[key])
        .filter((game) => isBefore(parseISO(game.date), endOfToday()))
        .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
        .map((game) => ({ game, save: saveGNN(game.id).get(saves) }))
    )(gamesDE);
  }
);
