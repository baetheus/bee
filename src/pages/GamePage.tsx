import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";
import { fold } from "fp-ts/es6/Option";

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

interface GamePageProps {
  id?: string;
}

export const GamePage: FunctionalComponent<GamePageProps> = ({
  id = "new",
}) => {
  const selectGame = useCallback(selectGameAndSaveById(id), [id]);
  const [data, dispatch] = useGameStore(selectGame, eqGameAndSave.equals);
  const [notification] = useGameStore(notificationL.get);

  const handleSubmit = useCallback(
    (guess: string) => dispatch(submitWord({ id, guess })),
    [id]
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
            notification={notification}
            onSubmit={handleSubmit}
          />
        )
      )(data)}
    </DefaultLayout>
  );
};
