import * as C from "io-ts/es6/Codec";
import { Game } from "./models";

export const GameStateCodec = C.type({
  games: C.record(
    C.type({
      id: C.string,
      chars: C.array(C.string),
      middle: C.string,
      dictionary: C.array(C.string),
      found: C.array(C.string),
      date: C.string,
    })
  ),
});
export type GameStateCodec = C.TypeOf<typeof GameStateCodec>;

export const GameCodec: C.Codec<Game> = C.type({
  id: C.string,
  chars: C.array(C.string),
  middle: C.string,
  dictionary: C.array(C.string),
  found: C.array(C.string),
  date: C.string,
});

export const GamesCodec = C.array(GameCodec);
