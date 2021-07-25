import addDays from "https://deno.land/x/date_fns@v2.22.1/addDays/index.ts";
import getDay from "https://deno.land/x/date_fns@v2.22.1/getDay/index.ts";
import * as D from "https://deno.land/x/fun@v1.0.0/schemable/decoder.ts";
import * as E from "https://deno.land/x/fun@v1.0.0/either.ts";
import { parse } from "https://deno.land/std@0.102.0/flags/mod.ts";
import { pipe } from "https://deno.land/x/fun@v1.0.0/fns.ts";

// Types
export const Game = D.struct({
  id: D.string,
  chars: D.array(D.string),
  middle: D.string,
  dictionary: D.array(D.string),
});
export type Game = D.TypeOf<typeof Game>;
type Games = Record<string, ScheduledGame>;

export const ScheduledGame = pipe(
  Game,
  D.intersect(D.struct({ date: D.string })),
);
export type ScheduledGame = D.TypeOf<typeof ScheduledGame>;

export const Commands = D.literal("runonce", "create");
export type Commands = D.TypeOf<typeof Commands>;

export const Env = pipe(
  D.struct({
    s: D.string,
    o: D.string,
    n: D.number,
    _: D.tuple(Commands),
  }),
  D.intersect(D.partial({
    f: D.string,
  })),
);
export type Env = D.TypeOf<typeof Env>;

export const GameSource = D.struct({
  40: D.array(Game),
  60: D.array(Game),
  80: D.array(Game),
  100: D.array(Game),
  120: D.array(Game),
  fri: D.array(Game),
  sat: D.array(Game),
});
export type GameSource = D.TypeOf<typeof GameSource>;

// Utilities
const intToGroup: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, keyof GameSource> = {
  0: "40",
  1: "60",
  2: "80",
  3: "100",
  4: "120",
  5: "fri",
  6: "sat",
};

const shuffle = <A>(array: Array<A>): Array<A> => {
  let curId = array.length;
  while (0 !== curId) {
    const randId = Math.floor(Math.random() * curId);
    curId -= 1;
    const tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};

// Commands
export const sortGamesOnce = async (env: Env): Promise<void> => {
  // Get Games Data (
  const gamesData = await Deno.readFile(env.s);
  const textDecoder = new TextDecoder("utf-8");
  const gamesString = textDecoder.decode(gamesData);
  const gamesJson = JSON.parse(gamesString);

  const gameRecord = D.record(Game);
  const gamesDecoded = gameRecord(gamesJson);

  if (E.isLeft(gamesDecoded)) {
    console.error(`Unable to decode game source ${env.s}`);
    console.error(D.draw(gamesDecoded.left));
    return;
  }

  const games = Object.values(gamesDecoded.right);
  const output: Record<string, Game[]> = {
    "40": [],
    "60": [],
    "80": [],
    "100": [],
    "120": [],
    "fri": [],
    "sat": [],
  };

  games.forEach((game) => {
    const length = game.dictionary.length;
    if (length < 41) {
      output["40"].push(game);
    } else if (length < 61) {
      output["60"].push(game);
    } else if (length < 81) {
      output["80"].push(game);
    } else if (length < 101) {
      output["100"].push(game);
    } else if (length < 121) {
      output["120"].push(game);
    } else {
      if (game.id.includes("s") || game.id.includes("d")) {
        output["fri"].push(game);
      } else {
        output["sat"].push(game);
      }
    }
  });

  await Deno.writeTextFile(env.o, JSON.stringify(output, null, 2));
};

export const create = async (env: Env): Promise<void> => {
  // Get Games Source
  const gamesData = await Deno.readFile(env.s);
  const textDecoder = new TextDecoder("utf-8");
  const gamesString = textDecoder.decode(gamesData);
  const gamesJson = JSON.parse(gamesString);

  const gamesDecoded = GameSource(gamesJson);

  if (E.isLeft(gamesDecoded)) {
    console.error(`Unable to decode game source ${env.s}`);
    console.error(D.draw(gamesDecoded.left));
    console.error("Raw Data");
    console.error(gamesJson);
    return;
  }

  const games: Record<keyof GameSource, Game[]> = {
    "40": shuffle(gamesDecoded.right[40] as Game[]),
    "60": shuffle(gamesDecoded.right[60] as Game[]),
    "80": shuffle(gamesDecoded.right[80] as Game[]),
    "100": shuffle(gamesDecoded.right[100] as Game[]),
    "120": shuffle(gamesDecoded.right[120] as Game[]),
    "fri": shuffle(gamesDecoded.right.fri as Game[]),
    "sat": shuffle(gamesDecoded.right.sat as Game[]),
  };

  // Get Games Output
  const outputData = await Deno.readFile(env.o);
  const outputString = textDecoder.decode(outputData);
  const outputJson = JSON.parse(outputString);

  const outputRecord = D.record(ScheduledGame);
  const outputDecoded = outputRecord(outputJson);

  if (E.isLeft(outputDecoded)) {
    console.error(`Unable to decode game output ${env.o}`);
    console.error(D.draw(outputDecoded.left));
    return;
  }

  const output = outputDecoded.right;

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
    const gamesForDay = games[dayKey];

    let found = false;
    do {
      const candidate = gamesForDay.pop();

      if (candidate === undefined) {
        console.error(`Ran out of games on ${day}`);
        return;
      }

      if (output[candidate.id] === undefined) {
        output[candidate.id] = {
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
  await Deno.writeTextFile(env.o, JSON.stringify(output, null, 2));
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
