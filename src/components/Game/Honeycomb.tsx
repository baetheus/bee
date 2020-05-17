import { h, FunctionalComponent } from "preact";

import { Game } from "../../stores/game";

import { Hex } from "./Hex";

interface HoneycombProps {
  game: Game;
  onClickLetter: (char: string) => void;
}

export const Honeycomb: FunctionalComponent<HoneycombProps> = ({
  game,
  onClickLetter,
}) => {
  return (
    <div class="fld-col flg-3 hex-padding">
      <div class="fld-row flg-3 hex-shift">
        <Hex char={game.chars[0]} onClickLetter={onClickLetter} />
        <Hex char={game.chars[1]} onClickLetter={onClickLetter} />
      </div>
      <div class="fld-row flg-3">
        <Hex char={game.chars[2]} onClickLetter={onClickLetter} />
        <Hex
          char={game.middle}
          onClickLetter={onClickLetter}
          color="var(--cb-honey)"
          hover="var(--cb-honey-dark)"
        />
        <Hex char={game.chars[3]} onClickLetter={onClickLetter} />
      </div>
      <div class="fld-row flg-3 hex-shift">
        <Hex char={game.chars[4]} onClickLetter={onClickLetter} />
        <Hex char={game.chars[5]} onClickLetter={onClickLetter} />
      </div>
    </div>
  );
};
