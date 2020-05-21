import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens, Optional } from "monocle-ts";
import { map, isNone, some, none } from "fp-ts/es6/Option";
import { createStore, filterEvery } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { caseFn } from "@nll/dux/Reducers";
import { isBefore, parseISO, compareDesc, endOfToday } from "date-fns";
import { createSelector } from "reselect";
import { from } from "rxjs";
import { ajax } from "rxjs/ajax";

import { GameState, Game, Notice, Save, GameAndSave } from "./models";
import { logger, createStateRestore } from "../../libs/dux";
import { eqInsensitive } from "../../libs/strings";
import { INITIAL_GAME_STATE, badNotice, goodNotice } from "./consts";
import { GameStateCodec, GamesCodec, SaveStateCodec } from "./validators";
import { notNil } from "../../libs/typeguards";
import { asyncMergeMap } from "@nll/dux/Operators";
import { mapDecode } from "../../libs/ajax";
import { merge } from "../../libs/arrays";

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
export const gameG = (id: string) =>
  gamesL.composeOptional(Optional.fromNullableProp<GameState["games"]>()(id));

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
    const game = gameG(id).getOption(s);
    if (isNone(game)) {
      return setNotification(badNotice("No game!"));
    }

    if (!game.value.dictionary.some(eqInsensitive(guess))) {
      return from([setNotification(badNotice(`${guess}`.toUpperCase()))]);
    }

    if (game.value.found.some(eqInsensitive(guess))) {
      return from([setNotification(badNotice("Already Found"))]);
    }

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

/** Get New Games */
const getNewGames = action.async<string, Game[]>("GET_NEW_GAMES");
const getNewGamesSuccessCase = caseFn(
  getNewGames.success,
  (s: GameState, { value: { result } }) => {
    const newGames = result
      .filter((game) => !notNil(s.games[game.id]))
      .reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {} as Record<string, Game>);
    return gamesL.modify((games) => ({ ...games, ...newGames }))(s);
  }
);
const getNewGamesRunOnce = asyncMergeMap(getNewGames, (url) =>
  ajax.getJSON(url).pipe(mapDecode(GamesCodec))
);
gameStore
  .addReducers(getNewGamesSuccessCase)
  .addRunOnces(getNewGamesRunOnce)
  .dispatch(getNewGames.pending("new_games.json"));

/** Game Storage - To Be Removed */
const storage = createStateRestore<GameStateCodec, GameState>(
  GameStateCodec,
  "GAME_STATE"
); // REMOVE

// MIGRATION CASE
const mapSavesCase = caseFn(
  storage.getState.success,
  (s: GameState, { value: { result } }) => {
    const saves: Save[] = Object.keys(result.games)
      .map((id) => ({ id, found: result.games[id].found }))
      .filter(({ found }) => found.length > 0);

    console.log(`Migrating ${saves.length} save(s).`);

    return saves.reduce(
      (state, saveA) =>
        saveG(saveA.id).modify((saveB) => ({
          id: saveA.id,
          found: merge(saveA.found, saveB.found),
        }))(state),
      s
    );
  }
);
gameStore.addReducers(mapSavesCase); // REMOVE
storage.wireupActions(gameStore, []); // REMOVE

/** Save Storage - Migrate to simple wireup in one week */
const {
  getState,
  getStateRunOnce,
  setState,
  setStateRunEvery,
} = createStateRestore<SaveStateCodec, GameState>(
  SaveStateCodec,
  "GAME_STORE/SAVES"
);

/** Merge Saves */
const mergeSavesCase = caseFn(getState.success, (s: GameState, { value }) => {
  const saves = value.result.saves;
  const state = Object.keys(saves)
    .map((id) => saves[id])
    .reduce(
      (state, saveA) =>
        saveG(saveA.id).modify((saveB) => ({
          id: saveA.id,
          found: merge(saveA.found, saveB.found),
        }))(state),
      s
    );
  return state;
});
const saveOnFoundRunEvery = filterEvery(foundWord, () =>
  setState.pending("GAME_STORE/SAVES")
);
gameStore
  .addReducers(mergeSavesCase)
  .addRunEverys(setStateRunEvery, saveOnFoundRunEvery)
  .addRunOnces(getStateRunOnce)
  .dispatch(getState.pending("GAME_STORE/SAVES"));

/** Selectors */
export const selectGameAndSaveById = (id: string) =>
  createSelector(gameG(id).getOption, saveG(id).get, (game, save) =>
    map((game: Game) => ({ game, save }))(game)
  );

export const selectAvailableGames = createSelector(
  gamesL.get,
  savesL.get,
  (games, saves): GameAndSave[] => {
    return Object.keys(games)
      .map((key) => games[key])
      .filter((game) => isBefore(parseISO(game.date), endOfToday()))
      .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
      .map((game) => ({ game, save: saveGNN(game.id).get(saves) }));
  }
);
