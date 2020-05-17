import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback, useEffect } from "preact/hooks";
import { squash, isInitial } from "@nll/datum/DatumEither";
import { GiBee } from "react-icons/gi";

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
import { Found } from "../components/Game/Found";

interface GamePageProps {
  id?: string;
}

type Data = {
  game: GameModel;
  save: SavedGame;
};

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
    if (isInitial(data)) {
      console.warn("Get game and save from backend here");
    }
  }, []);

  console.log("render");

  return (
    <main class="vwcmx-px500 vwc-p100 fld-col flg-4 ai-ctr pwa-4">
      <h1 class="fld-row flg-4">
        <GiBee />
        <span>bee</span>
      </h1>
      {squash(
        () => <LoadingCard title="Loading Game" />,
        (error) => <ErrorCard title="Error Loading Game" error={error} />,
        ({ game, save }: Data) => (
          <Fragment>
            <Found game={game} save={save} />
            <Game game={game} onSubmit={handleSubmit} />
          </Fragment>
        )
      )(data)}
    </main>
  );
};
