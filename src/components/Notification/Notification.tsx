import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { useTransition, SpringConfig, animated } from "react-spring";

import {
  selectNotifications,
  useNotifications,
  Notification as NotificationModel,
} from "../../stores/notifications";
import { notNil } from "../../libs/typeguards";

import { If, Map } from "../Control";

interface NotificationProps {
  /**
   * Notification timeout in milliseconds
   */
  timeout?: number;
  config?: SpringConfig;
}

const toTheme = (n: NotificationModel) =>
  n.type === "success" ? "ct-honey" : "ct-light";

export const Notification: FunctionalComponent<NotificationProps> = ({
  config = { tension: 300, friction: 14 },
}) => {
  const [notifications] = useNotifications(selectNotifications);

  const transitions = useTransition(notifications, (item) => item.title, {
    from: { opacity: 0, transform: "translate(0%, -100%)" },
    enter: { opacity: 1, transform: "translate(0%, 0%)" },
    leave: { opacity: 0, transform: "translate(100%, 0%)" },
    config,
  });

  return (
    <div class="notification-container fld-col ai-stc ofa-hi">
      <Map items={transitions}>
        {({ item, key, props }) => (
          <animated.div
            key={key}
            class={`pwb-3 pwt-2 pwx-4 fld-col ai-ctr ${toTheme(item)}`}
            style={props}
          >
            <h1>{item.title.toUpperCase()}</h1>
            <If predicate={notNil(item.message)}>
              {() => <strong>{item.message}</strong>}
            </If>
          </animated.div>
        )}
      </Map>
    </div>
  );
};
