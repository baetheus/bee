import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";
import { Option } from "fp-ts/es6/Option";
import { MdRefresh } from "react-icons/md";

import { Game as GameModel } from "../../stores/game";
import { shuffle } from "../../libs/arrays";

import { Button } from "../Button";

import { Honeycomb } from "./Honeycomb";
import { Notification } from "./Notification";
import { Found } from "./Found";

interface GameProps {
  game: GameModel;
  notification: Option<string>;
  onSubmit?: (word: string) => void;
}

const highlight = (middle: string) => (char: string) => {
  if (middle.toLowerCase() === char.toLowerCase()) {
    return <span class="cf-rev-honey-dark bounceIn">{char}</span>;
  }
  return <span class="bounceIn">{char}</span>;
};

const MAX_WORD_SIZE = 17;

export const Game: FunctionalComponent<GameProps> = ({
  game,
  notification,
  onSubmit = () => {},
}) => {
  const [word, setWord] = useState("");
  const [chars, setChars] = useState(game.chars);
  const handleShuffle = useCallback(() => setChars(shuffle), [setChars]);

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
    <div class="fld-col flg-6 ai-ctr">
      <div class="vh-2 vw-p100 fs-u5 ta-c ovx-au fld-row ai-ctr jc-ctr ct-lighter ff-head">
        {word.toUpperCase().split("").map(highlight(game.middle))}
      </div>

      <Honeycomb
        chars={chars}
        middle={game.middle}
        onClickLetter={handleLetterClick}
        middleColor="#f0da9b"
        charColor="#dedede"
      />

      <section class="fld-col flg-4">
        <div class="vw-px300 fld-row flg-4 fs-u3">
          <Button
            className="vw-p50 jc-ctr"
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            disabled={word.length === 0}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            theme="ct-base ct-disabled-on-disabled"
            hover="ct-light-on-hover"
            class="pwx-4"
            onClick={handleShuffle}
          >
            <MdRefresh />
          </Button>
          <Button
            className="vw-p50 jc-ctr"
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            disabled={word.length <= 3 || !word.includes(game.middle)}
            onClick={handleSubmit}
          >
            Enter
          </Button>
        </div>

        <Found game={game} className="vwmx-px300 vw-p100" />
      </section>
    </div>
  );
};
