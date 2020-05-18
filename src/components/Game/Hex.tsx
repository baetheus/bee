import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";

interface HexProps {
  char: string;
  onClickLetter: (char: string) => void;
  color?: string;
  hover?: string;
}

export const Hex: FunctionalComponent<HexProps> = ({
  char,
  onClickLetter,
  color = "#dedede",
  hover = "#cdcdcd",
}) => {
  const handleClick = useCallback(() => onClickLetter(char), [
    onClickLetter,
    char,
  ]);

  return (
    <div
      class="hex"
      style={`--hex-color: ${color}; --hex-hover: ${hover};`}
      onClick={handleClick}
    >
      <span>{char.toUpperCase()}</span>
    </div>
  );
};
