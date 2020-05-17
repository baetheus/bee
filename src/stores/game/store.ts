import { useState, useEffect, useCallback } from "preact/hooks";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { DatumEither, success, initial, map } from "@nll/datum/DatumEither";
import { pipe } from "fp-ts/es6/pipeable";
import { Lens, Optional } from "monocle-ts";

import { Game } from "./models";
import { caseFn } from "@nll/dux/Reducers";
import {
  fromUndefined,
  getOrElse,
  seqTDatumEither,
  datumEitherL,
} from "../../libs/datum";
import { logger } from "../../libs/dux";
import { eqInsensitive } from "../../libs/strings";

/** Setup Store */
const action = actionCreatorFactory("GAME_STORE");

interface GameState {
  games: Record<string, DatumEither<Error, Game>>;
}
const INITIAL_GAME_STATE: GameState = {
  games: {
    new: success({
      id: "new",
      chars: ["G", "B", "W", "I", "T", "E"],
      middle: "L",
      dictionary: ["lilt", "glib", "glee", "bite", "gibe", "will", "gill"],
      found: ["LILT", "GLIB", "GLEE", "BITE", "GIBE", "WILL", "GILL"],
    }),
  },
};
export const gameStore = createStore(INITIAL_GAME_STATE).addMetaReducers(
  logger()
);
export const useGameStore = useStoreFactory(gameStore, useState, useEffect);
export const useGameDispatch = useDispatchFactory(gameStore, useCallback);

/** Lenses */
const rootProp = Lens.fromProp<GameState>();
const gamesL = rootProp("games");
const gameG = (id: string) =>
  gamesL
    .compose(Lens.fromNullableProp<GameState["games"]>()(id, initial))
    .composeOptional(datumEitherL());

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

/** Selectors */
export const selectGameById = (id: string) => (s: GameState) =>
  s.games[id] ?? initial;
