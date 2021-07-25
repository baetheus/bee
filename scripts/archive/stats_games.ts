async function stats_games() {
  type Game = {
    id: string;
    chars: string[];
    middle: string;
    dictionary: string[];
    date: string; // ISO
  };
  type Games = Record<string, Game>;

  const games: Games = JSON.parse(await Deno.readTextFile("./games.json"));
  const played: Games = JSON.parse(
    await Deno.readTextFile("./games_20200528.json")
  );

  const counts: Record<string, Game[]> = {
    40: [],
    60: [],
    80: [],
    100: [],
    120: [],
    more: [],
    noSOrD: [],
  };

  Object.keys(games).forEach((key) => {
    const game = games[key];
    if (game.dictionary.length <= 40) {
      counts[40].push(game);
    } else if (game.dictionary.length <= 60) {
      counts[60].push(game);
    } else if (game.dictionary.length <= 80) {
      counts[80].push(game);
    } else if (game.dictionary.length <= 100) {
      counts[100].push(game);
    } else if (game.dictionary.length <= 120) {
      counts[120].push(game);
    } else {
      if (game.id.includes("s") || game.id.includes("d")) {
        counts.noSOrD.push(game);
      } else {
        counts.more.push(game);
      }
    }
  });

  Object.keys(counts).forEach((count) => {
    console.log(`Count ${count} -> ${counts[count].length} puzzles.`);
  });

  // const today = new Date();

  // const addDays = (date: Date, days: number) => {
  //   var newDate = new Date(date.valueOf());
  //   newDate.setDate(date.getDate() + days);
  //   return newDate;
  // };

  // function findNew(
  //   from: Game[],
  //   check: Games,
  //   check2: Games,
  //   index: number
  // ): Game {
  //   let i = index;
  //   while (i < from.length) {
  //     const game = from[i]; // Game we are checking for
  //     if (
  //       (check[game.id] === undefined ||
  //         today < new Date(check[game.id].date)) &&
  //       check2[game.id] === undefined
  //     ) {
  //       return game;
  //     } else {
  //       i++;
  //     }
  //   }
  //   return from[index]; // Failure just reuse but game could be null..
  // }

  // const startDate = new Date("2020-06-01T03:00:00.000-08:00");
  // const year: Record<string, Game> = {};

  // for (let i = 0; i < 365; i++) {
  //   const dateO = addDays(startDate, i);
  //   const date = dateO.toISOString();
  //   let game: Game;

  //   // Sunday = 0, Monday = 1, ...
  //   switch (dateO.getDay()) {
  //     case 0:
  //       game = findNew(counts.noSOrD, played, year, Math.floor(i / 7));
  //       break;
  //     case 1:
  //       game = findNew(counts[40], played, year, Math.floor(i / 7));
  //       break;
  //     case 2:
  //       game = findNew(counts[60], played, year, Math.floor(i / 7));
  //       break;
  //     case 3:
  //       game = findNew(counts[80], played, year, Math.floor(i / 7));
  //       break;
  //     case 4:
  //       game = findNew(counts[100], played, year, Math.floor(i / 7));
  //       break;
  //     case 5:
  //       game = findNew(counts[120], played, year, Math.floor(i / 7));
  //       break;
  //     default:
  //     case 6:
  //       game = findNew(counts.more, played, year, Math.floor(i / 7));
  //       break;
  //   }
  //   year[game.id] = Object.assign(game, { date });
  // }

  // await Deno.writeTextFile(
  //   "games_20200602.json",
  //   JSON.stringify(year, null, 2)
  // );
}

await stats_games();
