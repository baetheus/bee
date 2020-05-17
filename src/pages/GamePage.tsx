import { h, FunctionalComponent } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import { squash, isInitial } from "@nll/datum/DatumEither";

import {
  useGameStore,
  selectGameById,
  Game as GameModel,
  SavedGame,
  selectSaveById,
  useGameDispatch,
  submitWord,
} from "../stores/game";
import { LoadingCard } from "../components/LoadingCard";
import { ErrorCard } from "../components/ErrorCard";
import { Game } from "../components/Game";
import { seqSDatumEither } from "../libs/datum";

interface GamePageProps {
  id?: string;
}

export const GamePage: FunctionalComponent<GamePageProps> = ({
  id = "new",
}) => {
  const selectGame = useCallback(selectGameById(id), [id]);
  const [game, dispatch] = useGameStore(selectGame);
  const selectSave = useCallback(selectSaveById(id), [id]);
  const [save] = useGameStore(selectSave);
  const handleSubmit = useCallback(
    (guess: string) => dispatch(submitWord({ id, guess })),
    [id]
  );

  const data = seqSDatumEither({ game, save });

  useEffect(() => {
    if (isInitial(game)) {
      console.log("Get Game From Backend Here");
    }
  }, []);

  console.log("render");

  return (
    <main class="vwcmx-rem0 vwc-p100 fld-col flg-6 ai-ctr pwa-4">
      <h1>Bee</h1>
      {squash(
        () => <LoadingCard title="Loading Game" />,
        (error) => <ErrorCard title="Error Loading Game" error={error} />,
        (props: { game: GameModel; save: SavedGame }) => (
          <Game {...props} onSubmit={handleSubmit} />
        )
      )(data)}
    </main>
  );
};
