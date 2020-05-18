import { Option } from "fp-ts/es6/Option";

export type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
  date: string;
};

export interface GameState {
  notification: Option<string>;
  games: Record<string, Game>;
}
