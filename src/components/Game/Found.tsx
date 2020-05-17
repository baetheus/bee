import { h, FunctionalComponent } from "preact";

import { SavedGame, Game } from "../../stores/game";

import { If } from "../Control";

interface FoundProps {
  game: Game;
  save: SavedGame;
}

export const Found: FunctionalComponent<FoundProps> = ({ game, save }) => {
  return (
    <div>
      <header class="fld-row flg-4 jc-spb">
        <span>Found Words</span>
        <span>
          {save.found.length} of {game.dictionary.length}
        </span>
      </header>
      <If predicate={save.found.length > 0}>
        {() => (
          <section>
            <ul>
              {save.found.map((word) => (
                <li>{word}</li>
              ))}
            </ul>
          </section>
        )}
      </If>
    </div>
  );
};
