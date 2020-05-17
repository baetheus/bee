import { h, FunctionalComponent } from "preact";

interface LoadingCardProps {
  title?: string;
}

export const LoadingCard: FunctionalComponent<LoadingCardProps> = ({
  title = "Loading",
}) => (
  <article class="pwa-4 bra-1 ct-disabled">
    <h2 class="ta-c">{title}</h2>
  </article>
);
