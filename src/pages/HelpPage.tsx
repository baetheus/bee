import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "../components/Layouts";

interface HelpPageProps {}

export const HelpPage: FunctionalComponent<HelpPageProps> = () => (
  <DefaultLayout>
    <article class="fld-col flg-6 pwa-4">
      <section class="fld-col flg-4">
        <h1 class="fs-u4">About</h1>
        <p>
          I made this clone of the{" "}
          <a href="https://www.nytimes.com/puzzles/spelling-bee">
            New York Times Spelling Bee
          </a>{" "}
          because my friends and I didn't all want to pay to play.
        </p>
        <p>
          As I built it I realized that I didn't like many of the aspects of the
          original design: the small size of the buttons, the overly
          effervescent encouragements, the lack of stats and spoilers in the
          puzzle, and the inability to play previous puzzlies. So I "fixed"
          these things.
        </p>
        <p>
          I continue to make improvements so be sure to refresh on occasion so
          you get the latest version. I intend to keep this puzzlie free forever
          so I hope you enjoy!
        </p>
      </section>

      <section class="fld-col flg-4">
        <h1 class="fs-u4">Rules</h1>
        <p>
          The goal of the puzzlie is to find all of the words that can be
          created with the given seven letters. There are only a few notes:
        </p>
        <ul class="fld-col flg-4 ls-dot spaced">
          <li>Words must be 4 letters or longer.</li>
          <li>Words must contain the middle letter.</li>
          <li>Letters can be used more than once.</li>
        </ul>
      </section>

      <section class="fld-col flg-4">
        <h1 class="fs-u4">Weekly Progression</h1>

        <p>
          The puzzlies change throughout the week in size and letter choices.
        </p>
        <ul class="fld-col flg-4 ls-dot spaced">
          <li>Sunday's puzzlies will have fewer than 41 words.</li>
          <li>Monday's puzzlies will have 41 to 60 words.</li>
          <li>Tuesday's puzzlies will have 61 to 80 words.</li>
          <li>Wednesday's puzzlies will have 81 to 100 words.</li>
          <li>Thursday's puzzlies will have 101 to 120 words.</li>
          <li>Friday's puzzlies will have than more 120 words.</li>
          <li>
            Saturday's puzzlies will have more than 120 words and will exclude
            the letters s and d.
          </li>
        </ul>
      </section>
    </article>
  </DefaultLayout>
);
