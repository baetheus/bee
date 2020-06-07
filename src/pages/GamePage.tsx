import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { identity } from "fp-ts/es6/function";
import { datumEither as DE } from "@nll/datum";

import {
  useGameStore,
  selectGameAndSaveById,
  submitWord,
  GameAndSave,
  eqGameAndSave,
} from "../stores/game";
import { ErrorCard } from "../components/ErrorCard";
import { Game } from "../components/Game";
import { DefaultLayout } from "../components/Layouts";
import {
  useSettingsStore,
  changeSettings,
  DetailOptions,
} from "../stores/settings";

interface GamePageProps {
  id?: string;
}

export const GamePage: FunctionalComponent<GamePageProps> = ({
  id = "new",
}) => {
  const selectGame = useCallback(selectGameAndSaveById(id), [id]);
  const [data, gameDispatch] = useGameStore(selectGame, eqGameAndSave.equals);

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
      {DE.squash(
        () => <div>Loading</div>,
        () => (
          <ErrorCard
            title="Game Not Found"
            error={`Game with id '${id}' does not exist!`}
          />
        ),
        ({ game, save, score }: GameAndSave) => (
          <Game
            game={game}
            found={save.found}
            score={score}
            details={details}
            onDetailsChange={handleDetailsChange}
            onSubmit={handleSubmit}
          />
        )
      )(data)}
    </DefaultLayout>
  );
};
