import { h, FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { Option, fold, isSome } from "fp-ts/es6/Option";

import { gameStore, clearNotification, Notice } from "../../stores/game";
import { Highlight } from "./Highlight";

interface NotificationProps {
  word: string;
  middle: string;
  notification: Option<Notice>;
  className?: string;
}

export const Notification: FunctionalComponent<NotificationProps> = ({
  word,
  notification,
  middle,
  className = "",
}) => {
  if (word.length > 0 && isSome(notification)) {
    gameStore.dispatch(clearNotification);
  }

  useEffect(() => {
    if (isSome(notification)) {
      const timer = setTimeout(
        () => gameStore.dispatch(clearNotification),
        900
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return fold(
    () => null,
    (n: Notice) =>
      n.type === "good" ? (
        <Highlight className="backOutDown" word={n.message} middle={middle} />
      ) : (
        <Highlight className="zoomOutRight" word={n.message} middle={middle} />
      )
  )(notification);
};
