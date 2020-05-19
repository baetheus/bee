import { useRef, PropRef, Inputs, useEffect, useState } from "preact/hooks";
import { notNil } from "./typeguards";
import { BinaryData, FontFaceDescriptors } from "css-font-loading-module";

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

export const useCanvas2d = (
  fn: (ctx: CanvasRenderingContext2D) => void | (() => void),
  inputs: Inputs
): PropRef<HTMLCanvasElement> =>
  useCanvas((canvas) => {
    const ctx = canvas.getContext("2d");
    if (notNil(ctx)) {
      return fn(ctx);
    }
  }, inputs);

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
