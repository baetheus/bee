import { h } from "preact";
import { Router } from "preact-router";

import { GamePage } from "./pages/GamePage";

export function App() {
  return (
    <Router>
      <GamePage path="/" />
    </Router>
  );
}
