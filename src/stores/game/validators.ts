import * as C from "io-ts/es6/Codec";
import { Game, Save } from "./consts";

/** Game / Games */
export const GameCodec: C.Codec<unknown, Game> = C.type({
  id: C.string,
  chars: C.array(C.string),
  middle: C.string,
  dictionary: C.array(C.string),
  date: C.string,
});
export const GamesCodec = C.record(GameCodec);

/** Save / Saves */
export const SaveCodec: C.Codec<unknown, Save> = C.type({
  id: C.string,
  found: C.array(C.string),
});

/** GameState */
export const GameStateCodec = C.type({
  games: C.record(GameCodec),
});
export type GameStateCodec = C.TypeOf<typeof GameStateCodec>;

/** Save State */
export const SaveStateCodec = C.type({
  saves: C.record(SaveCodec),
});
export type SaveStateCodec = C.TypeOf<typeof SaveStateCodec>;
