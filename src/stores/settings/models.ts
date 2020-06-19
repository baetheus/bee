export const DetailOptions = {
  stats: "stats",
  words: "words",
} as const;
export type DetailOptions = typeof DetailOptions[keyof typeof DetailOptions];

export const WordSortOptions = {
  Found: "Found",
  Length: "Length",
  Alphabetic: "Alphabetic",
} as const;
export type WordSortOptions = typeof WordSortOptions[keyof typeof WordSortOptions];

export type SettingsState = {
  vibration: boolean;
  details: DetailOptions;
  sort: WordSortOptions;
};
