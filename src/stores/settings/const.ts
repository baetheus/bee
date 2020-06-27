import * as C from "io-ts/es6/Codec";

import { SettingsState, DetailOptions, WordSortOptions } from "./models";
import { identity } from "fp-ts/es6/function";

export const INITIAL_SETTINGS_STATE: SettingsState = {
  vibration: true,
  details: DetailOptions.words,
  sort: WordSortOptions.Found,
};

export const SettingsStateCodec = C.partial({
  vibration: C.boolean,
  details: C.literal(DetailOptions.stats, DetailOptions.words),
  sort: C.literal(
    WordSortOptions.Found,
    WordSortOptions.Length,
    WordSortOptions.Alphabetic
  ),
});
export type SettingsStateCodec = C.TypeOf<typeof SettingsStateCodec>;

export const getWordSort = (
  sort: WordSortOptions
): ((words: string[]) => string[]) => {
  switch (sort) {
    case "Found":
      return (ws) => [...ws];
    case "Length":
      return (ws) => [...ws].sort((a, b) => a.length - b.length);
    case "Alphabetic":
      return (ws) => [...ws].sort((a, b) => a.localeCompare(b));
  }
};
