function get_played() {
  type Game = {
    id: string;
    chars: string[];
    middle: string;
    dictionary: string[];
    date: string;
  };

  const today = new Date();

  const GAME_FILE = "./games_20200602.json";
  const PLAYED_GAME_FILE = `./games_before_${today.toISOString()}.json`;

  const games: Record<string, Game> = JSON.parse(
    Deno.readTextFileSync(GAME_FILE)
  );
  const played_games: Record<string, Game> = {};

  Object.keys(games).forEach((key) => {
    if (new Date(games[key].date) < today) {
      played_games[key] = games[key];
    }
  });

  Deno.writeTextFileSync(PLAYED_GAME_FILE, JSON.stringify(played_games));
}

get_played();
