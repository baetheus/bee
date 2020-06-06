import { h } from "preact";
import { Router } from "preact-router";

import { GameListPage } from "./pages/GameListPage";
import { GamePage } from "./pages/GamePage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpPage } from "./pages/HelpPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <Router>
      <GameListPage path="/" />
      <GamePage path="/games/:id" />
      <SettingsPage path="/settings" />
      <HelpPage path="/help" />
      <NotFoundPage default />
    </Router>
  );
}
