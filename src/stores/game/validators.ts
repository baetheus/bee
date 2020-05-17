import * as C from "io-ts/es6/Codec";

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
