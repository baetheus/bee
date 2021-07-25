type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
};

const games: Game[] = JSON.parse(Deno.readTextFileSync("./games.json"));

const lengths = games
  .map((g) => g.dictionary)
  .reduce((acc, cur) => acc.concat(cur), [])
  .map((w) => w.length);

const maxLength = lengths.reduce((a, b) => Math.max(a, b), 0);

console.log(`Longest Word has ${maxLength} characters`);
