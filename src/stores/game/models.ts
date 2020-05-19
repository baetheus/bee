import { Option } from "fp-ts/es6/Option";

export type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
  date: string;
};

export type Notice = {
  type: "good" | "bad";
  message: string;
};

export interface GameState {
  notification: Option<Notice>;
  games: Record<string, Game>;
}
