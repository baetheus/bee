import * as C from "io-ts/es6/Codec";

import { SettingsState, DetailOptions } from "./models";

export const INITIAL_SETTINGS_STATE: SettingsState = {
  vibration: true,
  details: DetailOptions.words,
};

export const SettingsStateCodec = C.type({
  vibration: C.boolean,
  details: C.literal(DetailOptions.stats, DetailOptions.words),
});
export type SettingsStateCodec = C.TypeOf<typeof SettingsStateCodec>;
