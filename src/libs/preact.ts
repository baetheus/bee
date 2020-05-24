import { useRef, PropRef, Inputs, useEffect, useState } from "preact/hooks";
import { notNil } from "./typeguards";
import { BinaryData, FontFaceDescriptors } from "css-font-loading-module";

/** Use Canvas */
export const useCanvas = (
  fn: (canvas: HTMLCanvasElement) => void | (() => void),
  inputs: Inputs
): PropRef<HTMLCanvasElement> => {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => (notNil(ref.current) ? fn(ref.current) : undefined), [
    ref.current,
    ...inputs,
  ]);

  return ref;
};
/** Use Canvas 2D */
export const useCanvas2d = (
  { width, height }: { width: number; height: number },
  fn: (ctx: CanvasRenderingContext2D) => void | (() => void),
  inputs: Inputs
): PropRef<HTMLCanvasElement> => {
  return useCanvas(
    (canvas) => {
      const ctx = canvas.getContext("2d");

      if (notNil(ctx)) {
        const dpi = window.devicePixelRatio || 1;
        // Expand canvas
        canvas.width = width * dpi;
        canvas.height = height * dpi;
        // Scale Drawing
        ctx.scale(dpi, dpi);
        // Squish Canvas Back Down
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        return fn(ctx);
      }
    },
    [width, height, ...inputs]
  );
};

/** Use Font */
export const useFont = (
  family: string,
  source: string | BinaryData,
  descriptors?: FontFaceDescriptors
): FontFace | null => {
  const [font, setFont] = useState<FontFace | null>(null);
  useEffect(() => {
    if (notNil(font)) {
      return;
    }
    let cancelled = false;
    new FontFace(family, source, descriptors).load().then((fontFace) => {
      if (cancelled) {
        return;
      }
      setFont(fontFace);
    });
    return () => (cancelled = true);
  }, [family, source, descriptors]);
  return font;
};
