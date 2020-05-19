import { h, render } from "preact";

import { App } from "./App";

// Wait for font to load before rendering
new FontFace("Markazi Text", "url(/MarkaziText.ttf)")
  .load()
  .then((font) => {
    font.display = "swap";
    console.log("Loaded fontFace", font);
    return document.fonts.add(font).ready;
  })
  .then((fontSet) => {
    console.log("Got fontSet", fontSet);
    render(<App />, document.body);
  })
  .catch((error) => console.error("Failed to load font.", error));
