import { h, FunctionalComponent } from "preact";
import { useState, useCallback } from "preact/hooks";

import { Game } from "../../stores/game";

import { If } from "../Control";
import { Button } from "../Button";
import { isBefore, parseISO, startOfToday } from "date-fns";
import { eqInsensitive } from "../../libs/strings";

interface FoundProps {
  game: Game;
  className?: string;
}

export const Found: FunctionalComponent<FoundProps> = ({ game, className }) => {
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => {
    if (game.found.length > 0) {
      setShow((s) => !s);
    }
  }, [game, show, setShow]);

  const [showAll, setShowAll] = useState(false);
  const handleShowAll = useCallback(() => setShowAll((s) => !s), [setShowAll]);
  const list = showAll ? game.dictionary : game.found;

  return (
    <div class={`fld-col flg-4 ${className}`}>
      <div class="fld-row flg-4 jc-spb">
        <span class="fld-row flg-4">
          <span>Found Words</span>
          <span>{game.found.length}</span>
          <span class="fw-0">/</span>
          <span>{game.dictionary.length}</span>
        </span>

        <span
          class={`${
            game.found.length > 0
              ? "ct-rev-honey-dark crsr-pointer"
              : "cf-disabled"
          } fw-0`}
          onClick={handleShow}
        >
          {show ? "hide" : "show"}
        </span>
      </div>
      <If predicate={show}>
        {() => (
          <ul class="fit-grid fs-d2">
            {list.sort().map((word) => (
              <li
                class={
                  game.found.some(eqInsensitive(word))
                    ? "ct-rev-honey-dark"
                    : ""
                }
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </If>
      <If predicate={isBefore(parseISO(game.date), startOfToday())}>
        {() => (
          <Button
            theme="ct-honey ct-disabled-on-disabled"
            hover="ct-honey-dark-on-hover"
            class="fld-row ai-ctr jc-ctr"
            onClick={handleShowAll}
          >
            {showAll ? "Hide Spoilers" : "Show Spoilers"}
          </Button>
        )}
      </If>
    </div>
  );
};
