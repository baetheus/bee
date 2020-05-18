import { h } from "preact";
import { Router } from "preact-router";

import { GamePage } from "./pages/GamePage";
import { GameListPage } from "./pages/GameListPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Router>
      <GameListPage path="/" />
      <GamePage path="/games/:id" />
      <NotFoundPage default />
    </Router>
  );
}
