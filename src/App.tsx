import { h } from "preact";
import { Router } from "preact-router";

import { GamePage } from "./pages/GamePage";
import { GameListPage } from "./pages/GameListPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  return (
    <Router>
      <GameListPage path="/" />
      <GamePage path="/games/:id" />
      <SettingsPage path="/settings" />
      <NotFoundPage default />
    </Router>
  );
}
