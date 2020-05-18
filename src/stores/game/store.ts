import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens, Optional } from "monocle-ts";
import { Option, isNone, some } from "fp-ts/es6/Option";
import { createStore, filterEvery } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { caseFn } from "@nll/dux/Reducers";
import { isBefore, parseISO, compareDesc, endOfToday } from "date-fns";

import { GameState, Game } from "./models";
import { logger, createStateRestore } from "../../libs/dux";
import { eqInsensitive } from "../../libs/strings";
import { INITIAL_GAME_STATE } from "./consts";
import { GameStateCodec } from "./validators";

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

const foundL = Lens.fromProp<Game>()("found");
export const foundG = (id: string) => gameG(id).composeLens(foundL);

/** Notifications*/
export const setNotification = action.simple<Option<string>>(
  "SET_NOTIFICATION"
);
const setNotificationCase = caseFn(setNotification, (s: GameState, { value }) =>
  notificationL.set(value)(s)
);
gameStore.addReducers(setNotificationCase);

/** Submit Word */
export const submitWord = action.simple<{ id: string; guess: string }>(
  "SUBMIT_WORD"
);
const submitWordRunEvery = filterEvery(
  submitWord,
  (s: GameState, { value: { id, guess } }) => {
    const game = gameG(id).getOption(s);
    if (isNone(game)) {
      return setNotification(some("Error finding game"));
    }

    if (!game.value.dictionary.some(eqInsensitive(guess))) {
      return setNotification(some(`'${guess}' is not in the word list`));
    }

    if (game.value.found.some(eqInsensitive(guess))) {
      return setNotification(some(`You have already found '${guess}'`));
    }

    return foundWord({ id, guess });
  }
);
gameStore.addRunEverys(submitWordRunEvery);

const foundWord = action.simple<{ id: string; guess: string }>("FOUND_WORD");
const foundWordCase = caseFn(
  foundWord,
  (s: GameState, { value: { id, guess } }) =>
    foundG(id).modify((found) => [guess, ...found])(s)
);
const foundWordRunEvery = filterEvery(foundWord, (_, { value: { guess } }) =>
  setNotification(some(`You found '${guess}'`))
);
gameStore.addReducers(foundWordCase).addRunEverys(foundWordRunEvery);

/** Storage */
const storage = createStateRestore<GameStateCodec, GameState>(
  GameStateCodec,
  "GAME_STATE"
);
storage.wireup(gameStore);

/** Selectors */
export const selectGameById = (id: string) => gameG(id).getOption;
export const selectAvailableGames = (s: GameState) => {
  const gs = gamesL.get(s);
  return Object.keys(gs)
    .map((key) => gs[key])
    .filter((game) => isBefore(parseISO(game.date), endOfToday()))
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
};
