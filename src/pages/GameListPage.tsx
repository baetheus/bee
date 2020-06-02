import { h, FunctionalComponent } from "preact";
import { format, parseISO } from "date-fns";
import { Link } from "preact-router";
import { squash } from "@nll/datum/DatumEither";

import {
  useGameStore,
  selectAvailableGames,
  GameAndSave,
} from "../stores/game";

import { DefaultLayout } from "../components/Layouts";
import { Header } from "../components/Header";
import { ErrorCard } from "../components/ErrorCard";
import { LoadingCard } from "../components/LoadingCard";

const toData = (data: GameAndSave[]) => (
  <section class="fld-col flg-4 ai-stc">
    {data.map(({ game, save }) => (
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
            <span>{save.found.length}</span>
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
);

export const GameListPage: FunctionalComponent<{}> = () => {
  const [data] = useGameStore(selectAvailableGames);

  return (
    <DefaultLayout>
      <Header />

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
