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
