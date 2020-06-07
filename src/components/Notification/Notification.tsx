import { h, FunctionalComponent, VNode } from "preact";
import { useEffect, useCallback } from "preact/hooks";
import { isSome, fold } from "fp-ts/es6/Option";

import {
  selectNotification,
  useNotifications,
  Notification as NotificationModel,
  close,
} from "../../stores/notifications";
import { notNil } from "../../libs/typeguards";

import { If } from "../Control";

interface NotificationProps {
  /**
   * Notification timeout in milliseconds
   */
  timeout?: number;
}

const notify = (handleClose: () => void) => (n: NotificationModel) => {
  const theme = n.type === "success" ? "ct-honey" : "ct-light";
  return (
    <div
      class={`pwb-4 pwt-3 pwx-5 fld-col ai-ctr notification ${theme}`}
      onClick={handleClose}
    >
      <h1>{n.title.toUpperCase()}</h1>
      <If predicate={notNil(n.message)}>
        {() => <strong>{n.message}</strong>}
      </If>
    </div>
  );
};

export const Notification: FunctionalComponent<NotificationProps> = ({
  timeout = 1400,
}) => {
  const [notification, dispatch] = useNotifications(selectNotification);
  const handleClose = useCallback(
    () => (isSome(notification) ? dispatch(close(notification.value)) : null),
    [notification, dispatch]
  );

  useEffect(() => {
    if (isSome(notification)) {
      const timeoutRef = setTimeout(handleClose, timeout);
      return () => clearTimeout(timeoutRef);
    }
  }, [notification, dispatch]);

  return fold((): VNode | null => null, notify(handleClose))(notification);
};
