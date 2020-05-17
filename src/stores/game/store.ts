import { useState, useEffect, useCallback } from "preact/hooks";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { DatumEither, success, initial, map } from "@nll/datum/DatumEither";
import { pipe } from "fp-ts/es6/pipeable";

import { Game, SavedGame } from "./models";
import { caseFn } from "@nll/dux/Reducers";
import { fromUndefined, getOrElse } from "../../libs/datum";
import { logger } from "../../libs/dux";

/** Setup Store */
const action = actionCreatorFactory("GAME_STORE");

interface GameState {
  games: Record<string, DatumEither<Error, Game>>;
  saves: Record<string, DatumEither<Error, SavedGame>>;
}
const INITIAL_GAME_STATE: GameState = {
  games: {
    new: success({
      id: "new",
      chars: ["G", "B", "W", "I", "T", "E"],
      middle: "L",
      dictionary: ["lilt", "glib", "glee", "bite", "gibe", "will", "gill"],
    }),
  },
  saves: {
    new: success({
      id: "new",
      player: "Brandon",
      found: ["LILT", "GLIB", "GLEE", "BITE", "GIBE", "WILL", "GILL"],
    }),
  },
};
export const gameStore = createStore(INITIAL_GAME_STATE).addMetaReducers(
  logger()
);
export const useGameStore = useStoreFactory(gameStore, useState, useEffect);
export const useGameDispatch = useDispatchFactory(gameStore, useCallback);

/** Submit Word */
export const submitWord = action.simple<{ id: string; guess: string }>(
  "SUBMIT_WORD"
);
const submitWordCase = caseFn(
  submitWord,
  (s: GameState, { value: { id, guess } }) => {
    const isMatch = pipe(
      fromUndefined(s.games[id]),
      map((game) =>
        game.dictionary.some(
          (word) => word.toLowerCase() === guess.toLowerCase()
        )
      ),
      getOrElse(false)
    );
    if (isMatch) {
      const save = pipe(
        fromUndefined(s.saves[id]),
        map((save) => ({ ...save, found: save.found.concat(guess) }))
      );
      return { ...s, saves: { ...s.saves, [id]: save } };
    }
    return s;
  }
);
gameStore.addReducers(submitWordCase);

/** Selectors */
export const selectGameById = (id: string) => (s: GameState) =>
  s.games[id] ?? initial;

export const selectSaveById = (id: string) => (s: GameState) =>
  s.saves[id] ?? initial;
