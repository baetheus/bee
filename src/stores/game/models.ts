import { Option } from "fp-ts/es6/Option";

export type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
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
  games: Record<string, Game>;
  saves: Record<string, Save>;
}

export type GameAndSave = {
  game: Game;
  save: Save;
};
