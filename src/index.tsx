import { h, render } from "preact";

import { App } from "./App";

import "./styles/index.scss";

// Wait for font to load before rendering
new FontFace("Markazi Text", "url(/MarkaziText.ttf)")
  .load()
  .then((font) => {
    font.display = "swap";
    return document.fonts.add(font).ready;
  })
  .catch((error) => console.error("Failed to load font.", error))
  .then(() => {
    render(<App />, document.body);
  });
