type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
};

const profanity = [
  "arse",
  "arses",
  "asshole",
  "assholes",
  "bastard",
  "bastards",
  "bitch",
  "bitches",
  "bitchier",
  "bitchiest",
  "bitching",
  "bollocks",
  "bullocks",
  "bugger",
  "cunt",
  "cunts",
  "damn",
  "damns",
  "effing",
  "frigger",
  "fuck",
  "fucks",
  "fucker",
  "fuckers",
  "fucking",
  "goddamn",
  "goddamned",
  "godsdamn",
  "horseshit",
  "motherfucker",
  "nigga",
  "niggas",
  "nigger",
  "niggers",
  "shit",
  "shits",
  "shitting",
  "shittier",
  "shittiest",
  "shitass",
  "slut",
  "slutty",
  "sluts",
  "sluttier",
  "sluttiest",
  "twat",
  "twats",
];

const games: Record<string, Game> = JSON.parse(
  await Deno.readTextFile("./games.json")
);

function removeProfanity(game: Game): Game {
  const foundProfanity: string[] = [];
  const dictionary = game.dictionary.filter(
    (word) =>
      !profanity.some((p) => {
        if (p === word) {
          foundProfanity.push(word);
          return true;
        }
        return false;
      })
  );
  if (dictionary.length !== game.dictionary.length) {
    console.log(`Found profanity in ${game.id}: ${foundProfanity.join(", ")}`);
    return { ...game, dictionary };
  }
  return game;
}

function removeFound({ id, chars, middle, dictionary }: Game): Game {
  return { id, chars, middle, dictionary };
}

const newGames: Record<string, Game> = {};

Object.keys(games).forEach((key) => {
  newGames[key] = removeFound(removeProfanity(games[key]));
});

await Deno.writeTextFile(
  "./no_profanity_games.json",
  JSON.stringify(newGames, null, 2)
);
