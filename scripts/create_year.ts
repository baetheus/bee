type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
};

type GameWithDate = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
  date: string; // ISO
};

const addDays = (date: Date, days: number) => {
  var newDate = new Date(date.valueOf());
  newDate.setDate(date.getDate() + days);
  return newDate;
};
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const startDate = new Date("2020-05-17T03:00:00.000-08:00");
const gamesRaw = await Deno.readTextFile("./games.json");
const games: Game[] = JSON.parse(gamesRaw);
const year: Record<string, GameWithDate> = {};

for (let i = 0; i < 365; i++) {
  const game = games[getRandomInt(0, games.length - 1)];
  const gameWithDate: GameWithDate = {
    ...game,
    date: addDays(startDate, i).toISOString(),
  };
  year[game.id] = gameWithDate;
}

await Deno.writeTextFile("./games_2020.json", JSON.stringify(year, null, 2));
