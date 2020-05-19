import { h, FunctionalComponent } from "preact";
import { useMemo, useCallback, useState, useEffect } from "preact/hooks";

import { range, zip } from "../../libs/arrays";
import { useCanvas2d } from "../../libs/preact";
import { notNil } from "../../libs/typeguards";

interface HoneycombProps {
  chars: string[];
  middle: string;
  onClickLetter: (char: string) => void;
  middleColor?: string;
  charColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  gap?: number;
}

type Point = [number, number];

type Hex = {
  character: string;
  center: Point;
  color: string;
  path: Path2D;
};

const rotateFromX = (
  origin: Point,
  radius: number,
  step: number,
  steps = 6
): Point => [
  origin[0] + radius * Math.cos((step * 2 * Math.PI) / steps),
  origin[1] + radius * Math.sin((step * 2 * Math.PI) / steps),
];

const rotateFromY = (
  origin: Point,
  radius: number,
  step: number,
  steps = 6
): Point => [
  origin[0] + radius * Math.sin((step * 2 * Math.PI) / steps),
  origin[1] + radius * Math.cos((step * 2 * Math.PI) / steps),
];

const makeHex = (center: Point, radius: number): Path2D => {
  const path = new Path2D();
  range(7).forEach((step) => {
    const [x, y] = rotateFromX(center, radius, step);
    step === 0 ? path.moveTo(x, y) : path.lineTo(x, y);
  });
  return path;
};

const makeHexes = (
  ps: Omit<Required<HoneycombProps>, "onClickLetter">
): Hex[] => {
  const center: Point = [ps.width / 2, ps.height / 2];
  const ringRadius = 2 * ((2 * ps.radius) / Math.sqrt(5)) + ps.gap;
  const centers: { center: Point }[] = [
    { center },
    ...range(6)
      .map((step): Point => rotateFromY(center, ringRadius, step))
      .map((center) => ({ center })),
  ];
  const data = [
    { color: ps.middleColor, character: ps.middle },
    ...ps.chars.map((character) => ({ character, color: ps.charColor })),
  ];
  const hexes: Hex[] = zip(centers, data).map((d) => ({
    ...d,
    path: makeHex(d.center, ps.radius),
  }));
  return hexes;
};

export const Honeycomb: FunctionalComponent<HoneycombProps> = ({
  middle,
  chars,
  onClickLetter,
  middleColor = "",
  charColor = "",
  width = 300,
  height = 300,
  radius = 50,
  gap = 4,
}) => {
  const hexes = useMemo(
    () =>
      makeHexes({
        gap,
        height,
        width,
        charColor,
        middle,
        middleColor,
        chars,
        radius,
      }),
    [gap, height, width, charColor, middle, middleColor, chars, radius]
  );

  const ref = useCanvas2d(
    (ctx) => {
      ctx.clearRect(0, 0, width, height);
      hexes.forEach((hex) => {
        ctx.fillStyle = hex.color;
        ctx.fill(hex.path);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = `${radius}px "Markazi Text", sans-serif`;
        ctx.fillStyle = "#000000";
        ctx.fillText(
          hex.character.toUpperCase(),
          hex.center[0],
          hex.center[1] + 4
        );
        console.log("useCanvas2d", { ctx, hex });
      });
    },
    [hexes]
  );
  const ctx = notNil(ref.current) ? ref.current.getContext("2d") : null;

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (notNil(ctx)) {
        hexes.forEach(({ path, character }) => {
          if (ctx.isPointInPath(path, event.offsetX, event.offsetY)) {
            onClickLetter(character);
          }
        });
      }
    },
    [onClickLetter, ctx]
  );

  return (
    <div class="fld-col ai-ctr jc-ctr">
      <canvas ref={ref} width={width} height={height} onClick={handleClick} />
    </div>
  );
};
