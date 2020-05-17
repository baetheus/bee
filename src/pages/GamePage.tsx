import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";
import { fold } from "fp-ts/es6/Option";

import {
  useGameStore,
  selectGameById,
  Game as GameModel,
  submitWord,
} from "../stores/game";
import { ErrorCard } from "../components/ErrorCard";
import { Game } from "../components/Game";
import { Found } from "../components/Game/Found";
import { Header } from "../components/Header";
import { DefaultLayout } from "../components/Layouts";

interface GamePageProps {
  id?: string;
}

export const GamePage: FunctionalComponent<GamePageProps> = ({
  id = "new",
}) => {
  const selectGame = useCallback(selectGameById(id), [id]);
  const [game, dispatch] = useGameStore(selectGame);

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
        (game: GameModel) => (
          <Fragment>
            <Found game={game} />
            <Game game={game} onSubmit={handleSubmit} />
          </Fragment>
        )
      )(game)}
    </DefaultLayout>
  );
};
