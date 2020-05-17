import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";
import { format, parseISO } from "date-fns";

import {
  useGameStore,
  selectGameById,
  Game as GameModel,
  submitWord,
  gamesL,
  selectAvailableGames,
} from "../stores/game";
import { ErrorCard } from "../components/ErrorCard";
import { Game } from "../components/Game";
import { Found } from "../components/Game/Found";
import { DefaultLayout } from "../components/Layouts";
import { Header } from "../components/Header";
import { Link } from "preact-router";

export const GameListPage: FunctionalComponent<{}> = () => {
  const [games] = useGameStore(selectAvailableGames);

  return (
    <DefaultLayout>
      <Header />
      <section class="fld-col flg-4 ai-stc">
        {games.map((game) => (
          <Link
            href={`/games/${game.id}`}
            class="fld-col flg-3 ce-rev-honey cb-honey-on-hover pwa-4 bwa-1 bra-1 crsr-pointer"
          >
            <span class="fld-row flg-4 jc-spb fw-u1 fs-u1">
              <span class="fld-row flg-4 ">
                <span class="cf-rev-honey-dark">{game.middle}</span>
                {game.chars.map((char) => (
                  <span>{char}</span>
                ))}
              </span>

              <span class="fld-row flg-3 fs-d2">
                <span>{game.found.length}</span>
                <span class="fw-0">/</span>
                <span>{game.dictionary.length}</span>
              </span>
            </span>

            <span class="fs-d1">
              Released on {format(parseISO(game.date), "MM/dd/yyyy")}
            </span>
          </Link>
        ))}
      </section>
    </DefaultLayout>
  );
};
