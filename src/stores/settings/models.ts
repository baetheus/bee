export const DetailOptions = {
  stats: "stats",
  words: "words",
} as const;
export type DetailOptions = typeof DetailOptions[keyof typeof DetailOptions];

export type SettingsState = {
  vibration: boolean;
  details: DetailOptions;
};
