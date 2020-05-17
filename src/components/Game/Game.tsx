import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";

import { Game as GameModel, SavedGame } from "../../stores/game";

import { Honeycomb } from "./Honeycomb";
import { Button } from "../Button";

interface GameProps {
  game: GameModel;
  save: SavedGame;
  onSubmit?: (word: string) => void;
}

const highlight = (middle: string) => (char: string) => {
  if (middle.toLowerCase() === char.toLowerCase()) {
    return <span class="ct-rev-honey-dark bounceIn">{char}</span>;
  }
  return <span class="bounceIn">{char}</span>;
};

const MAX_WORD_SIZE = 300;

export const Game: FunctionalComponent<GameProps> = ({
  game,
  save,
  onSubmit = () => {},
}) => {
  const [word, setWord] = useState("");
  const handleLetterClick = useCallback(
    (char: string) => setWord((w) => (w.length < MAX_WORD_SIZE ? w + char : w)),
    [setWord]
  );
  const handleClear = useCallback(() => setWord(""), []);
  const handleSubmit = useCallback(() => onSubmit(word), []);

  return (
    <div class="fls-1-1 fld-col flg-7 ai-ctr">
      <h3 class="vh-2 vw-px300 ta-c ovx-au fld-row ai-ctr jc-ctr">
        {word.split("").map(highlight(game.middle))}
      </h3>
      <Honeycomb game={game} onClickLetter={handleLetterClick} />
      <div class="vw-px300 fld-row flg-4">
        <Button
          className="vw-p50 jc-ctr fs-u3"
          theme="ct-honey"
          hover="ct-honey-dark-on-hover"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          className="vw-p50 jc-ctr fs-u3"
          theme="ct-honey"
          hover="ct-honey-dark-on-hover"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
