import { none } from "fp-ts/es6/Option";
import * as E from "fp-ts/es6/Either";
import { initial } from "@nll/datum/DatumEither";
import { getEq } from "@nll/datum/Datum";

import { GameState, Notice, GameAndSave } from "./models";

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
