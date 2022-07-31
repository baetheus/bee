import addDays from "https://deno.land/x/date_fns@v2.22.1/addDays/index.ts";
import getDay from "https://deno.land/x/date_fns@v2.22.1/getDay/index.ts";
import * as D from "https://deno.land/x/fun@v1.0.0/schemable/decoder.ts";
import * as E from "https://deno.land/x/fun@v1.0.0/either.ts";
import { parse } from "https://deno.land/std@0.102.0/flags/mod.ts";
import { pipe } from "https://deno.land/x/fun@v1.0.0/fns.ts";
import {
  Game,
  Games,
  intToGroup,
  ScheduledGames,
  SortedGames,
} from "./types.ts";
import { bannedWords } from "./profanity.ts";

// Env Arguments
export const Commands = D.literal("runonce", "create", "filter");
export type Commands = D.TypeOf<typeof Commands>;

export const Env = pipe(
  D.struct({
    // Source
    s: D.string,
    // Output
    o: D.string,
    // Number of games to make
    n: D.number,
    // Command: runonce or create
    _: D.tuple(Commands),
  }),
  D.intersect(D.partial({
    f: D.string,
  })),
);
export type Env = D.TypeOf<typeof Env>;

type Mutable<T> = T extends ReadonlyArray<infer U> ? Array<Mutable<U>>
  : { [K in keyof T]: Mutable<T[K]> };

// Commands
export const sortGamesOnce = async (env: Env): Promise<void> => {
  // Get Games Data (
  const gamesData = await Deno.readFile(env.s);
  const textDecoder = new TextDecoder("utf-8");
  const gamesString = textDecoder.decode(gamesData);
  const gamesJson = JSON.parse(gamesString);
  const gamesDecoded = Games(gamesJson);

  if (E.isLeft(gamesDecoded)) {
    console.error(`Unable to decode game source ${env.s}`);
    console.error(D.draw(gamesDecoded.left));
    return;
  }

  const games = Object.values(gamesDecoded.right) as unknown as Mutable<Games>;
  const sortedGames: Mutable<SortedGames> = {
    "40": [],
    "60": [],
    "80": [],
    "100": [],
    "120": [],
    "fri": [],
    "sat": [],
  };

  for (const key in games) {
    const game = games[key];
    game.dictionary = game.dictionary.filter((word) =>
      bannedWords.every((w) => w !== word)
    );
    const length = game.dictionary.length;
    if (length < 41) {
      sortedGames["40"].push(game);
    } else if (length < 61) {
      sortedGames["60"].push(game);
    } else if (length < 81) {
      sortedGames["80"].push(game);
    } else if (length < 101) {
      sortedGames["100"].push(game);
    } else if (length < 121) {
      sortedGames["120"].push(game);
    } else {
      if (game.id.includes("s") || game.id.includes("d")) {
        sortedGames["fri"].push(game);
      } else {
        sortedGames["sat"].push(game);
      }
    }
  }

  await Deno.writeTextFile(env.o, JSON.stringify(sortedGames, null, 2));
};

export const create = async (env: Env): Promise<void> => {
  const textDecoder = new TextDecoder("utf-8");

  // Get Games Source
  const sortedGamesArray = await Deno.readFile(env.s);
  const sortedGamesString = textDecoder.decode(sortedGamesArray);
  const sortedGamesJson = JSON.parse(sortedGamesString);
  const sortedGamesDecoded = SortedGames(sortedGamesJson);

  if (E.isLeft(sortedGamesDecoded)) {
    console.error(`Unable to decode game source ${env.s}`);
    console.error(D.draw(sortedGamesDecoded.left));
    console.error("Raw Data");
    console.error(sortedGamesJson);
    return;
  }

  const sortedGames = sortedGamesDecoded.right as unknown as Mutable<
    SortedGames
  >;

  // Get Existing Games
  const existingGamesArray = await Deno.readFile(env.o);
  const existingGamesString = textDecoder.decode(existingGamesArray);
  const existingGamesJson = JSON.parse(existingGamesString);
  const existingGamesDecoded = ScheduledGames(existingGamesJson);

  if (E.isLeft(existingGamesDecoded)) {
    console.error(`Unable to decode game output ${env.o}`);
    console.error(D.draw(existingGamesDecoded.left));
    return;
  }

  const existingGames = existingGamesDecoded.right;

  // Get starting day
  let day = new Date();

  if (typeof env.f === "string") {
    try {
      day = new Date(env.f);
    } catch (e) {
      console.error(`Unable to parse from date ${env.f}.`);
      console.error(e);
      return;
    }
  }

  // Generate the new puzzles
  while (env.n > 0) {
    const dayNumber = getDay(day) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
    const dayKey = intToGroup[dayNumber];
    const gamesForDay = sortedGames[dayKey];

    let found = false;

    do {
      const candidate = gamesForDay.pop();

      if (candidate === undefined) {
        console.error(`Ran out of games on ${day}`);
        return;
      }

      if (existingGames[candidate.id] === undefined) {
        existingGames[candidate.id] = {
          ...candidate,
          date: day.toISOString(),
        };
        found = true;
      }
    } while (!found);

    day = addDays(day, 1);
    env.n--;
  }

  // Write puzzles to output
  await Deno.writeTextFile(env.o, JSON.stringify(existingGames, null, 2));
};

// CLI
const run = async (): Promise<void> => {
  const envRaw = parse(Deno.args);
  const envDecoded = Env(envRaw);

  if (E.isLeft(envDecoded)) {
    console.error("Unabled to decode arguments");
    console.error(D.draw(envDecoded.left));
    return;
  }

  const env = envDecoded.right;
  switch (env._[0]) {
    case "runonce":
      await sortGamesOnce(env);
      break;
    case "create":
      await create(env);
      break;
  }

  console.log("Done");
};

// Run
await run();
