import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens, Optional } from "monocle-ts";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { caseFn } from "@nll/dux/Reducers";
import { isBefore, parseISO, endOfToday } from "date-fns";

import { GameState } from "./models";
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
export const gamesL = rootProp("games");
export const gameG = (id: string) =>
  gamesL.composeOptional(Optional.fromNullableProp<GameState["games"]>()(id));

/** Submit Word */
export const submitWord = action.simple<{ id: string; guess: string }>(
  "SUBMIT_WORD"
);
const submitWordCase = caseFn(
  submitWord,
  (s: GameState, { value: { id, guess } }) =>
    gameG(id).modify((game) => {
      if (
        game.dictionary.some(eqInsensitive(guess)) &&
        !game.found.some(eqInsensitive(guess))
      ) {
        return { ...game, found: game.found.concat(guess) };
      }
      return game;
    })(s)
);
gameStore.addReducers(submitWordCase);

/** Storage */
const storage = createStateRestore(GameStateCodec, "GAME_STATE");
storage.wireup(gameStore);

/** Selectors */
export const selectGameById = (id: string) => gameG(id).getOption;
export const selectAvailableGames = (s: GameState) => {
  const gs = gamesL.get(s);
  return Object.keys(gs)
    .map((key) => gs[key])
    .filter((game) => isBefore(parseISO(game.date), endOfToday()));
};
