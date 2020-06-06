import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "../components/Layouts";

interface HelpPageProps {}

export const HelpPage: FunctionalComponent<HelpPageProps> = () => (
  <DefaultLayout>
    <article class="fld-col flg-6 pwa-4">
      <section class="fld-col flg-4">
        <h2>Rules</h2>
        <p>
          The goal of the puzzle is to find all of of the words that can be
          created with the given seven letters. There are only a few notes:
        </p>
        <ul class="fld-col flg-4 ls-dot">
          <li>Words must be 4 letters or longer.</li>
          <li>Words must contain the middle letter.</li>
          <li>Letters can be used more than once.</li>
        </ul>
      </section>

      <section class="fld-col flg-4">
        <h2>Weekly Progression</h2>

        <p>
          The puzzles change throughout the week in size and letter choices.
        </p>
        <ul class="fld-col flg-4 ls-dot">
          <li>Monday will have puzzles with fewer than 41 words.</li>
          <li>Tuesday will have puzzles with 41 to 60 words.</li>
          <li>Wednesday will have puzzles with 61 to 80 words.</li>
          <li>Thursday will have puzzles with 81 to 100 words.</li>
          <li>Friday will have puzzles with 101 to 120 words.</li>
          <li>Saturday will contain puzzles with more than 120 words.</li>
          <li>
            Sunday will contain puzzlies with more than 120 words and will
            exclude the letters s and d.
          </li>
        </ul>
      </section>
    </article>
  </DefaultLayout>
);
