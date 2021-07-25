function create_year() {
  const GAME_GROUP_FILE = "./grouped_games.json";
  const DEFAULT_L_DISTANCE = 6;
  const DAYS_TO_BUILD = 365;
  const YEAR_FILE = "./games_20200606-test.json";

  /**
   * Levenshtein Distance
   */
  function levenshtein(a: string[], b: string[]): number {
    if (a.length === 0) {
      return b.length;
    }

    if (b.length === 0) {
      return a.length;
    }

    if (a[0] === b[0]) {
      return levenshtein(a.slice(1), b.slice(1));
    } else {
      return (
        1 +
        Math.min(
          levenshtein(a, b.slice(1)),
          levenshtein(a.slice(1), b),
          levenshtein(a.slice(1), b.slice(1))
        )
      );
    }
  }

  /**
   * Create Year of Games
   */
  const addDays = (date: Date, days: number) => {
    var newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  type Game = {
    id: string;
    chars: string[];
    middle: string;
    dictionary: string[];
    date: string;
  };

  type GameGroups = Record<
    "40" | "60" | "80" | "100" | "120" | "sat" | "sun",
    Game[]
  >;

  const startDate = new Date("2020-06-06T03:00:00.000-08:00");
  const games: GameGroups = JSON.parse(Deno.readTextFileSync(GAME_GROUP_FILE));
  const year: Record<string, Game> = {};
  let lastGame: Game | undefined = undefined;

  function findNewGame(from: Game[], distance = 5, lastGame?: Game): number {
    if (lastGame === undefined) {
      return 0;
    }

    return from.findIndex(
      (game) => levenshtein(game.id.split(""), lastGame.id.split("")) > distance
    );
  }

  const dayMap: Record<number, keyof GameGroups> = {
    0: "40",
    1: "60",
    2: "80",
    3: "100",
    4: "120",
    5: "sat",
    6: "sun",
  };

  Object.keys(games).forEach((key: any) =>
    console.log(`Group ${key} has ${(<any>games)[key].length}`)
  );

  function shuffle<T>(ts: T[]): T[] {
    const array = [...ts];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  /**
   * Shuffle Groups
   */
  Object.keys(games).forEach((key) => {
    const k = key as keyof GameGroups;
    const newGroup = shuffle(games[k]);
    games[k] = newGroup;
  });

  /**
   * Build out year
   */
  for (let i = 0; i < DAYS_TO_BUILD; i++) {
    const dateRaw = addDays(startDate, i);
    const date = dateRaw.toISOString();
    const day = dateRaw.getDay();
    const gameList = games[dayMap[day]];

    let distance = DEFAULT_L_DISTANCE;
    let index = findNewGame(gameList, distance, lastGame);

    while (index === -1) {
      if (distance === 0) {
        throw new Error("Cannot find game.");
      }
      distance = distance - 1;
      index = findNewGame(gameList, distance, lastGame);
    }

    let game = gameList[index];
    distance = DEFAULT_L_DISTANCE;
    lastGame = game;
    game.date = date;
    year[game.id] = game;
    gameList.splice(index, 1);
  }

  Object.keys(year)
    .map((key) => year[key])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .forEach((game) => {
      console.log(
        `Game ${game.id} on ${game.date} has ${game.dictionary.length} words.`
      );
    });

  Deno.writeTextFileSync(YEAR_FILE, JSON.stringify(year));
}

create_year();
