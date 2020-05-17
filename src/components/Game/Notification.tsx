import { h, FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { Option, fold, isSome, none } from "fp-ts/es6/Option";

import { gameStore, setNotification } from "../../stores/game";

interface NotificationProps {
  notification: Option<string>;
}

export const Notification: FunctionalComponent<NotificationProps> = ({
  notification,
}) => {
  useEffect(() => {
    if (isSome(notification)) {
      const timer = setTimeout(
        () => gameStore.dispatch(setNotification(none)),
        4 * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div class="vh-2 fld-row ai-ctr jc-ctr">
      {fold(
        () => <span></span>,
        (n: string) => <span>{n}</span>
      )(notification)}
    </div>
  );
};