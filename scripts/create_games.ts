import { either as E, pipeable as P } from "https://cdn.pika.dev/fp-ts@^2.6.1";

type Dictionary = {
  words: string[];
};

const notNil = <T>(t: T): t is NonNullable<T> => t !== undefined && t !== null;
const eq = <T>(a: T) => (b: T): boolean => a === b;
const isIn = <T>(as: ReadonlyArray<T>, comparitor: typeof eq = eq) => (
  b: T
): boolean => as.some(comparitor(b));
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function tryParse(data: any): E.Either<string, unknown> {
  return E.tryCatch(
    () => JSON.parse(data),
    () => "Unable to parse json."
  );
}

function isDictionary(data: unknown): data is Dictionary {
  if (typeof data !== "object") return false;
  if (!notNil(data)) return false;
  if (!data.hasOwnProperty("words")) return false;
  if (!Array.isArray((<any>data).words)) return false;
  if ((<any>data).words.some((word: any) => typeof word !== "string"))
    return false;
  return true;
}

function parseDictionary(dict: string): E.Either<string, Dictionary> {
  return P.pipe(
    tryParse(dict),
    E.chain((data) =>
      isDictionary(data)
        ? E.right(data)
        : E.left("Dictionary is formatted incorrectly")
    )
  );
}

const rawDictionary = await Deno.readTextFile("./dictionary.json");
const dictionaryE = parseDictionary(rawDictionary);

if (E.isLeft(dictionaryE)) {
  console.error(dictionaryE.left);
  Deno.exit(1);
}

const dictionary = dictionaryE.right;
const sevenPangrams: Record<string, string[]> = {};

function toUniqueLetters(word: string): string {
  return Array.from(new Set(word.split("")))
    .sort()
    .join("");
}

dictionary.words.forEach((word) => {
  const unique = toUniqueLetters(word);
  if (unique.length === 7) {
    if (notNil(sevenPangrams[unique])) {
      sevenPangrams[unique].push(word);
    } else {
      sevenPangrams[unique] = [word];
    }
  }
});

console.log(`${Object.keys(sevenPangrams).length} sets of unique letters`);

const pangrams = Object.keys(sevenPangrams)
  .map((key) => sevenPangrams[key])
  .reduce((acc: string[], cur: string[]) => {
    acc.push(...cur);
    return acc;
  }, []);

console.log(`${pangrams.length} pangrams`);

await Deno.writeTextFile(
  "./pangrams.json",
  JSON.stringify(sevenPangrams, null, 2)
);

type Game = {
  id: string;
  chars: string[];
  middle: string;
  dictionary: string[];
  found: string[];
};

function makeGame(pangram: string): Game {
  const allChars = toUniqueLetters(pangram).split("");
  const middle = allChars[getRandomInt(0, allChars.length - 1)];
  const chars = allChars.filter((char) => char !== middle);
  const dict = dictionary.words.filter((word) => {
    const letters = word.split("");
    return letters.includes(middle) && letters.every(isIn(allChars));
  });
  return {
    id: `${toUniqueLetters(pangram)}_${middle}`,
    chars,
    middle,
    dictionary: dict,
    found: [],
  };
}

const games = pangrams.map(makeGame);

await Deno.writeTextFile("./games.json", JSON.stringify(games, null, 2));
