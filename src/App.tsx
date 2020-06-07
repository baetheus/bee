import { h, Fragment } from "preact";
import { Router } from "preact-router";

import { GameListPage } from "./pages/GameListPage";
import { GamePage } from "./pages/GamePage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpPage } from "./pages/HelpPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { Notification } from "./components/Notification";

export function App() {
  return (
    <Fragment>
      <Notification />

      <Router>
        <GameListPage path="/" />
        <GamePage path="/games/:id" />
        <SettingsPage path="/settings" />
        <HelpPage path="/help" />
        <NotFoundPage default />
      </Router>
    </Fragment>
  );
}
