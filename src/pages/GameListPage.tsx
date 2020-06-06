import { h, FunctionalComponent } from "preact";
import { format, parseISO } from "date-fns";
import { Link } from "preact-router";
import { squash } from "@nll/datum/DatumEither";
import { useState, useCallback } from "preact/hooks";

import {
  useGameStore,
  selectAvailableGames,
  GameAndSave,
} from "../stores/game";

import { DefaultLayout } from "../components/Layouts";
import { ErrorCard } from "../components/ErrorCard";
import { LoadingCard } from "../components/LoadingCard";
import { Button } from "../components/Button";

const toData = (data: GameAndSave[]) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = useCallback(() => setShowAll((s) => !s), [setShowAll]);

  const games = showAll ? data : data.slice(0, 7);

  return (
    <section class="fld-col flg-4 ai-stc">
      {games.map(({ game, save }) => (
        <Link
          href={`/games/${game.id}`}
          class="fld-row flg-4 jc-spb ai-ctr ce-rev-honey cb-honey-on-hover pwy-4 pwl-5 pwr-4 bwa-1 bra-1 crsr-pointer"
        >
          <span class="fld-row flg-4 fw-u2 fs-u2">
            <span class="cf-rev-honey-dark">{game.middle}</span>
            {game.chars.map((char) => (
              <span>{char}</span>
            ))}
          </span>

          <span class="fld-col flg-3 ai-end fw-u1 fs-u1">
            <span class="fld-row flg-3 fs-d2">
              <span>{save.found.length}</span>
              <span class="fw-0">/</span>
              <span>{game.dictionary.length}</span>
            </span>

            <span class="fs-d2 fw-d1 as-end cf-light">
              {format(parseISO(game.date), "yyyy/MM/dd")}
            </span>
          </span>
        </Link>
      ))}
      <Button
        theme="ct-honey ct-disabled-on-disabled"
        hover="ct-honey-dark-on-hover"
        class="fld-row ai-ctr jc-ctr"
        onClick={handleShowAll}
      >
        {showAll ? "Hide Old Puzzlies" : "Show Old Puzzlies"}
      </Button>
    </section>
  );
};

export const GameListPage: FunctionalComponent<{}> = () => {
  const [data] = useGameStore(selectAvailableGames);

  return (
    <DefaultLayout>
      {squash(
        () => <LoadingCard title="Loading Games" />,
        (error: unknown) => (
          <ErrorCard title="Error Retrieving Games" error={error} />
        ),
        toData
      )(data)}
    </DefaultLayout>
  );
};
