import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";

import { SavedGame, Game } from "../../stores/game";

import { If } from "../Control";

interface FoundProps {
  game: Game;
  save: SavedGame;
}

export const Found: FunctionalComponent<FoundProps> = ({ game, save }) => {
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => {
    if (save.found.length > 0) {
      setShow((s) => !s);
    }
  }, [save, show, setShow]);

  return (
    <div class="fld-col flg-4">
      <div class="fld-row flg-4 jc-spb">
        <span class="fld-row flg-4">
          <span>Found Words</span>
          <span>{save.found.length}</span>
          <span class="fw-0">/</span>
          <span>{game.dictionary.length}</span>
        </span>

        <span
          class={`${
            save.found.length > 0 ? "ct-link crsr-pointer" : "cf-disabled"
          } fw-0`}
          onClick={handleShow}
        >
          {show ? "hide" : "show"}
        </span>
      </div>
      <If predicate={show}>
        {() => (
          <ul class="fit-grid fs-d1 ct-rev-honey-dark">
            {save.found.sort().map((word) => (
              <li>{word}</li>
            ))}
          </ul>
        )}
      </If>
    </div>
  );
};
