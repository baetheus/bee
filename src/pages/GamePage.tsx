import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";
import { fold } from "fp-ts/es6/Option";

import {
  useGameStore,
  selectGameById,
  Game as GameModel,
  submitWord,
  notificationL,
} from "../stores/game";
import { ErrorCard } from "../components/ErrorCard";
import { Game, Found, Notification } from "../components/Game";
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
        (game: GameModel) => (
          <Fragment>
            <Notification notification={notification} />
            <Game game={game} onSubmit={handleSubmit} />
            <Found game={game} />
          </Fragment>
        )
      )(game)}
    </DefaultLayout>
  );
};
