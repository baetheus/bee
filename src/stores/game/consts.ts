import { Option, none } from "fp-ts/es6/Option";
import * as E from "fp-ts/es6/Either";
import { DatumEither, initial } from "@nll/datum/DatumEither";
import { getEq } from "@nll/datum/Datum";

import { notNil } from "../../libs/typeguards";

export type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  date: string;
};

export type Save = {
  id: string;
  found: string[];
};

export type Notice = {
  type: "good" | "bad";
  message: string;
};

export interface GameState {
  notification: Option<Notice>;
  games: DatumEither<Error, Record<string, Game>>;
  saves: Record<string, Save>;
}

export type GameAndSave = {
  game: Game;
  save: Save;
  score: number;
};

export const eqGameAndSave = getEq(
  E.getEq<Error, GameAndSave>(
    {
      equals: (a, b) => a === b,
    },
    {
      equals: (a, b) => a.game === b.game && a.save === b.save,
    }
  )
);

export const goodNotice = (message: string): Notice => ({
  type: "good",
  message,
});
export const badNotice = (message: string): Notice => ({
  type: "bad",
  message,
});

export const INITIAL_GAME_STATE: GameState = {
  notification: none,
  saves: {},
  games: initial,
};

export const SCORE_MAP: Record<string, number> = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

function charToScore(char: string): number {
  return notNil(SCORE_MAP[char]) ? SCORE_MAP[char] : 0;
}

export function wordToScore(word: string): number {
  return word
    .split("")
    .reduce((total, letter) => total + charToScore(letter), 0);
}

export function foundToScore(found: string[]): number {
  return found.reduce((total, word) => total + wordToScore(word), 0);
}
