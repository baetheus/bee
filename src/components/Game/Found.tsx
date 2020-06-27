import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";
import { isBefore, parseISO, startOfToday } from "date-fns";

import { If } from "../Control";
import { Button } from "../Button";

import { DetailOptions, WordSortOptions } from "../../stores/settings";
import { Game } from "../../stores/game";
import { eqInsensitive } from "../../libs/strings";
import { notNil } from "../../libs/typeguards";
import { isIn } from "../../libs/arrays";

interface WordListProps {
  words: string[];
  found: string[];
  sort: WordSortOptions;
  showAll: boolean;
  onSortChange: (sort: WordSortOptions) => void;
}

const WordList: FunctionalComponent<WordListProps> = ({
  words,
  found,
  sort,
  showAll,
  onSortChange,
}) => (
  <If predicate={words.length > 0}>
    {() => (
      <Fragment>
        <ul class="fit-grid-3 fs-d2">
          {words.map((word) => (
            <li
              class={found.some(eqInsensitive(word)) ? "ct-rev-honey-dark" : ""}
            >
              {word}
            </li>
          ))}
        </ul>
        <If predicate={!showAll}>
          {() => (
            <div class="fld-row flg-4">
              {Object.keys(WordSortOptions).map((key: any) => (
                <Button
                  class="fls-1-1 fld-row ai-ctr jc-ctr fs-d2 vw-p30"
                  theme={key === sort ? "ct-light" : "ct-lighter"}
                  hover="ct-dark"
                  onClick={() => onSortChange(key)}
                >
                  {key}
                </Button>
              ))}
            </div>
          )}
        </If>
      </Fragment>
    )}
  </If>
);

interface StatsProps {
  found: string[];
  dictionary: string[];
  chars: string[];
  middle: string;
}

const getStats = (words: string[]) => {
  let stats: Record<string, number> = {};
  words.forEach((word) => {
    if (notNil(stats[word.length])) {
      stats[word.length] = stats[word.length] + 1;
    } else {
      stats[word.length] = 1;
    }
  });
  return stats;
};

const getPangrams = (dictionary: string[], chars: string[], middle: string) => {
  const allchars = chars.concat(middle);
  return dictionary.filter((word) =>
    allchars.every((char) => word.includes(char))
  );
};

const Stats: FunctionalComponent<StatsProps> = ({
  found,
  dictionary,
  chars,
  middle,
}) => {
  const dictStatsArray = useMemo(() => {
    const stats = getStats(dictionary);
    return Object.keys(stats).map((key) => ({
      key,
      value: stats[key],
    }));
  }, [dictionary]);
  const foundStats = useMemo(() => getStats(found), [found]);
  const pangrams = useMemo(() => getPangrams(dictionary, chars, middle), [
    dictionary,
    chars,
    middle,
  ]);
  const foundPangrams = useMemo(() => found.filter(isIn(pangrams)), [
    found,
    pangrams,
  ]);

  return (
    <ul class="fs-d1 fld-col flg-2">
      {dictStatsArray.map(({ key, value }) => (
        <li class="fld-row flg-3 jc-spb ce-rev-honey bwb-1">
          <span>{key} letter words</span>
          <span>
            <strong>{foundStats[key] || 0}</strong>
            <span>/</span>
            <strong>{value}</strong>
          </span>
        </li>
      ))}
      <li class="fld-row flg-3 jc-spb">
        <span>Pangrams</span>
        <span>
          <strong>{foundPangrams.length}</strong>
          <span>/</span>
          <strong>{pangrams.length}</strong>
        </span>
      </li>
    </ul>
  );
};

interface FoundProps {
  word: string;
  game: Game;
  details: DetailOptions;
  found: string[];
  score: number;
  sort: WordSortOptions;
  onDetailsChange: (details: DetailOptions) => void;
  onSortChange: (sort: WordSortOptions) => void;
  className?: string;
}

export const Found: FunctionalComponent<FoundProps> = ({
  word,
  game,
  sort,
  found,
  score,
  details,
  className,
  onDetailsChange,
  onSortChange,
}) => {
  const handleWordsSelect = useCallback(
    () => onDetailsChange(DetailOptions.words),
    [onDetailsChange]
  );
  const handleStatsSelect = useCallback(
    () => onDetailsChange(DetailOptions.stats),
    [onDetailsChange]
  );

  const [showAll, setShowAll] = useState(false);
  const handleShowAll = useCallback(() => setShowAll((s) => !s), [setShowAll]);

  const list = showAll ? game.dictionary : found;
  const words = useMemo(() => list.filter((l) => l.startsWith(word)), [
    list,
    word,
    sort,
  ]);

  return (
    <div class={`fld-col ${className} bwa-1 bra-1 ce-rev-honey ova-hi`}>
      <div class="fld-row">
        <span
          class={`${
            details === "words" ? "cb-honey" : "cb-rev-honey-dark"
          } cb-honey-dark-on-hover fls-1-1 pwa-4 ta-c bwb-1 ce-rev-honey`}
          onClick={handleWordsSelect}
        >
          Words
        </span>
        <span
          class={`${
            details === "stats" ? "cb-honey" : "cb-rev-honey-dark"
          } cb-honey-dark-on-hover fls-1-1 pwa-4 ta-c bwb-1 ce-rev-honey`}
          onClick={handleStatsSelect}
        >
          Stats
        </span>
      </div>

      <section class="fld-col flg-4 pwa-4">
        <div class="fld-row flg-4 jc-spb">
          <span>
            Found <strong>{found.length}</strong> /{" "}
            <strong>{game.dictionary.length}</strong>
          </span>

          <span class="cf-rev-honey-dark">
            <strong>{score}</strong> point{score === 1 ? "" : "s"}
          </span>
        </div>
        <If predicate={details === "words"}>
          {() => (
            <WordList
              words={words}
              found={found}
              sort={sort}
              showAll={showAll}
              onSortChange={onSortChange}
            />
          )}
        </If>

        <If predicate={details === "stats"}>
          {() => (
            <Stats
              found={found}
              dictionary={game.dictionary}
              chars={game.chars}
              middle={game.middle}
            />
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
      </section>
    </div>
  );
};
