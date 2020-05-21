import * as C from "io-ts/es6/Codec";

import { SettingsState } from "./models";

export const INITIAL_SETTINGS_STATE: SettingsState = {
  vibration: true,
  showAnswers: false,
};

export const SettingsStateCodec = C.type({
  vibration: C.boolean,
  showAnswers: C.boolean,
});
export type SettingsStateCodec = C.TypeOf<typeof SettingsStateCodec>;
