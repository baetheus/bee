import { h, FunctionalComponent } from "preact";

import { Hex } from "./Hex";

interface HoneycombProps {
  chars: string[];
  middle: string;
  onClickLetter: (char: string) => void;
}

export const Honeycomb: FunctionalComponent<HoneycombProps> = ({
  chars,
  middle,
  onClickLetter,
}) => {
  return (
    <div class="fld-col flg-3 hex-padding">
      <div class="fld-row flg-3 hex-shift">
        <Hex char={chars[0]} onClickLetter={onClickLetter} />
        <Hex char={chars[1]} onClickLetter={onClickLetter} />
      </div>
      <div class="fld-row flg-3">
        <Hex char={chars[2]} onClickLetter={onClickLetter} />
        <Hex
          char={middle}
          onClickLetter={onClickLetter}
          color="var(--cb-honey)"
          hover="var(--cb-honey-dark)"
        />
        <Hex char={chars[3]} onClickLetter={onClickLetter} />
      </div>
      <div class="fld-row flg-3 hex-shift">
        <Hex char={chars[4]} onClickLetter={onClickLetter} />
        <Hex char={chars[5]} onClickLetter={onClickLetter} />
      </div>
    </div>
  );
};
