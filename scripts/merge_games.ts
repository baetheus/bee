async function merge_games() {
  type Game = {
    id: string;
    chars: string[];
    middle: string;
    dictionary: string[];
    date: string; // ISO
  };
  type Games = Record<string, Game>;

  const today = new Date();

  const played: Games = JSON.parse(
    await Deno.readTextFile("./games_20200528.json")
  );
  const unplayed: Games = JSON.parse(
    await Deno.readTextFile("./games_20200602.json")
  );

  Object.keys(played).forEach((key) => {
    const game = played[key];
    const date = new Date(game.date);

    if (date < today) {
      if (unplayed[game.id] !== undefined) {
        console.log("Uh oh!", JSON.stringify(game, null, 2));
      } else {
        unplayed[game.id] = game;
      }
    }
  });

  await Deno.writeTextFile(
    "merged_games.json",
    JSON.stringify(unplayed, null, 2)
  );
}

await merge_games();
