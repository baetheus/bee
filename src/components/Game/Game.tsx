import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";
import { Option } from "fp-ts/es6/Option";
import { MdRefresh, MdBackspace, MdClear, MdCheck } from "react-icons/md";

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
  const handleDelete = useCallback(() => setWord((w) => w.slice(0, -1)), [
    setWord,
  ]);
  const handleLetterClick = useCallback(
    (char: string) => setWord((w) => (w.length < MAX_WORD_SIZE ? w + char : w)),
    [setWord]
  );
  const handleSubmit = useCallback(() => {
    onSubmit(word);
    setWord("");
  }, [word, setWord, onSubmit]);

  return (
    <div class="fld-col flg-4 ai-ctr vwc-p100">
      <div class="vh-2 fs-u5 ta-c fld-row ai-ctr jc-ctr ct-lighter ff-head ps-rel">
        {word.toUpperCase().split("").map(highlight(game.middle))}

        <Notification notification={notification} className="ps-abs" />
      </div>

      <div class="fld-col ai-ctr vwc-p100">
        <div class="fld-row flg-4 jc-spb">
          <Button
            className="pwx-4 fs-u4"
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            disabled={word.length === 0}
            onClick={handleClear}
          >
            <MdClear />
          </Button>

          <Button
            className="pwx-4 fs-u4"
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            disabled={word.length === 0}
            onClick={handleDelete}
          >
            <MdBackspace />
          </Button>
        </div>

        <Honeycomb
          chars={chars}
          middle={game.middle}
          onClickLetter={handleLetterClick}
          className="mwyr-6"
          middleColor="#f0da9b"
          charColor="#dedede"
        />

        <div class="fld-row flg-4 jc-spb">
          <Button
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            class="pwx-4 fs-u4"
            onClick={handleShuffle}
          >
            <MdRefresh />
          </Button>

          <Button
            className="pwx-4 fs-u4"
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            disabled={word.length <= 3 || !word.includes(game.middle)}
            onClick={handleSubmit}
          >
            <MdCheck />
          </Button>
        </div>
      </div>

      <Found game={game} className="vwmx-px300 vw-p100" />
    </div>
  );
};
