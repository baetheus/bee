import * as D from "https://deno.land/x/fun@v1.0.0/schemable/decoder.ts";
import { pipe } from "https://deno.land/x/fun@v1.0.0/fns.ts";

// A raw game object
export const Game = D.struct({
  id: D.string,
  chars: D.array(D.string),
  middle: D.string,
  dictionary: D.array(D.string),
});
export type Game = D.TypeOf<typeof Game>;

// A record of raw game objects
export const Games = D.record(Game);
export type Games = D.TypeOf<typeof Games>;

// A collection of games sorted into length buckets
export const SortedGames = D.struct({
  40: D.array(Game),
  60: D.array(Game),
  80: D.array(Game),
  100: D.array(Game),
  120: D.array(Game),
  fri: D.array(Game),
  sat: D.array(Game),
});
export type SortedGames = D.TypeOf<typeof SortedGames>;

// A game object with a date field indicating it is scheduled
export const ScheduledGame = pipe(
  Game,
  D.intersect(D.struct({ date: D.string })),
);
export type ScheduledGame = D.TypeOf<typeof ScheduledGame>;

// A collection of scheduled games
export const ScheduledGames = D.record(ScheduledGame);
export type ScheduledGames = D.TypeOf<typeof ScheduledGames>;

// A simple type to turn a day of the week modulus into a sorted bucket
export const intToGroup: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, keyof SortedGames> =
  {
    0: "40",
    1: "60",
    2: "80",
    3: "100",
    4: "120",
    5: "fri",
    6: "sat",
  };
