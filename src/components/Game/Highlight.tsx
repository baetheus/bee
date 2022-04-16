import { h, FunctionalComponent } from "preact";

interface HighlightProps {
  chars: string[],
  word: string;
  middle: string;
  className?: string;
}

const highlight = (chars: string[], middle: string) => (char: string) => {
  const input = char.toLowerCase();
  if (middle.toLowerCase() === input) {
    return <span class="cf-rev-honey-dark bounceIn">{char}</span>;
  }
  if (chars.indexOf(input) === -1) {
    return <span class="cf-disabled bounceIn">{char}</span>;
  }
  return <span class="bounceIn">{char}</span>;
};

export const Highlight: FunctionalComponent<HighlightProps> = ({
  chars,
  word,
  middle,
  className = "",
}) => {
  return (
    <span class={className}>
      {word.toUpperCase().split("").map(highlight(chars, middle))}
    </span>
  );
};
