import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { MdVibration } from "react-icons/md";

import { useGameStore, settingsL, changeSettings } from "../stores/game";
import { DefaultLayout } from "../components/Layouts";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

export const SettingsPage: FunctionalComponent<{}> = () => {
  const [{ vibration }, dispatch] = useGameStore(settingsL.get);
  const handleVibration = useCallback(
    () => dispatch(changeSettings({ vibration: !vibration })),
    [vibration]
  );

  return (
    <DefaultLayout>
      <Header />

      <div class="fld-col flg-4">
        <Button class="fld-row flg-4" onClick={handleVibration}>
          <MdVibration />
          <span>{vibration ? "Turn Off Vibration" : "Turn On Vibration"}</span>
        </Button>
      </div>
    </DefaultLayout>
  );
};
