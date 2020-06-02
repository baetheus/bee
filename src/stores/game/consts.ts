import { none } from "fp-ts/es6/Option";
import * as E from "fp-ts/es6/Either";
import { initial } from "@nll/datum/DatumEither";
import { getEq } from "@nll/datum/Datum";

import { Option } from "fp-ts/es6/Option";
import { DatumEither } from "@nll/datum/DatumEither";

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
