import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { fold } from "fp-ts/es6/Option";
import { identity } from "fp-ts/es6/function";

import {
  useGameStore,
  selectGameAndSaveById,
  submitWord,
  notificationL,
  GameAndSave,
  eqGameAndSave,
} from "../stores/game";
import { ErrorCard } from "../components/ErrorCard";
import { Game } from "../components/Game";
import { Header } from "../components/Header";
import { DefaultLayout } from "../components/Layouts";
import { useSettingsStore, changeSettings } from "../stores/settings";
import { DetailOptions } from "stores/settings/models";

interface GamePageProps {
  id?: string;
}

export const GamePage: FunctionalComponent<GamePageProps> = ({
  id = "new",
}) => {
  const selectGame = useCallback(selectGameAndSaveById(id), [id]);
  const [data, gameDispatch] = useGameStore(selectGame, eqGameAndSave.equals);
  const [notification] = useGameStore(notificationL.get);

  const [{ details }, settingsDispatch] = useSettingsStore(identity);

  const handleDetailsChange = useCallback(
    (details: DetailOptions) => settingsDispatch(changeSettings({ details })),
    [settingsDispatch]
  );
  const handleSubmit = useCallback(
    (guess: string) => gameDispatch(submitWord({ id, guess })),
    [id, gameDispatch]
  );

  return (
    <DefaultLayout>
      <Header />
      {fold(
        () => (
          <ErrorCard
            title="Game Not Found"
            error={`Game with id '${id}' does not exist!`}
          />
        ),
        ({ game, save }: GameAndSave) => (
          <Game
            game={game}
            found={save.found}
            details={details}
            notification={notification}
            onDetailsChange={handleDetailsChange}
            onSubmit={handleSubmit}
          />
        )
      )(data)}
    </DefaultLayout>
  );
};
