import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";

import { Game as GameModel, SavedGame } from "../../stores/game";

import { Button } from "../Button";

import { Honeycomb } from "./Honeycomb";
import { Found } from "./Found";

interface GameProps {
  game: GameModel;
  onSubmit?: (word: string) => void;
}

const highlight = (middle: string) => (char: string) => {
  if (middle.toLowerCase() === char.toLowerCase()) {
    return <span class="cf-rev-honey-dark bounceIn">{char}</span>;
  }
  return <span class="bounceIn">{char}</span>;
};

const MAX_WORD_SIZE = 300;

export const Game: FunctionalComponent<GameProps> = ({
  game,
  onSubmit = () => {},
}) => {
  const [word, setWord] = useState("");
  const handleClear = useCallback(() => setWord(""), [setWord]);
  const handleLetterClick = useCallback(
    (char: string) => setWord((w) => (w.length < MAX_WORD_SIZE ? w + char : w)),
    [setWord]
  );
  const handleSubmit = useCallback(() => {
    onSubmit(word);
    setWord("");
  }, [word, setWord, onSubmit]);

  return (
    <div class="fls-1-1 fld-col flg-6 ai-ctr jc-spb-vh550">
      <div class="vh-2 vw-p100 fs-u5 ta-c ovx-au fld-row ai-ctr jc-ctr ct-lighter">
        {word.split("").map(highlight(game.middle))}
      </div>
      <Honeycomb game={game} onClickLetter={handleLetterClick} />
      <div class="vw-px300 fld-row flg-4">
        <Button
          className="vw-p50 jc-ctr fs-u3"
          theme="ct-honey ct-disabled-on-disabled"
          hover="ct-honey-dark-on-hover"
          disabled={word.length === 0}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          className="vw-p50 jc-ctr fs-u3"
          theme="ct-honey ct-disabled-on-disabled"
          hover="ct-honey-dark-on-hover"
          disabled={word.length <= 3}
          onClick={handleSubmit}
        >
          Enter
        </Button>
      </div>
    </div>
  );
};
