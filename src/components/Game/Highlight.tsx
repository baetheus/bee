import { h, FunctionalComponent } from "preact";

interface HighlightProps {
  word: string;
  middle: string;
  className?: string;
}

const highlight = (middle: string) => (char: string) => {
  if (middle.toLowerCase() === char.toLowerCase()) {
    return <span class="cf-rev-honey-dark bounceIn">{char}</span>;
  }
  return <span class="bounceIn">{char}</span>;
};

export const Highlight: FunctionalComponent<HighlightProps> = ({
  word,
  middle,
  className = "",
}) => {
  return (
    <span class={className}>
      {word.toUpperCase().split("").map(highlight(middle))}
    </span>
  );
};
