import { useState, useEffect } from "preact/hooks";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { caseFn } from "@nll/dux/Reducers";
import { createStore, filterEvery } from "@nll/dux/Store";
import { useStoreFactory } from "@nll/dux/React";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

import { logger } from "../../libs/dux";

import type { State, Notification } from "./models";

const INITIAL_NOTIFICATION_STATE: State = {
  notifications: [],
};

/**
 * Setup Store
 */
const actions = actionCreatorFactory("NOTIFICATIONS");
export const notificationsStore = createStore(
  INITIAL_NOTIFICATION_STATE
).addMetaReducers(logger("SHOW_LOG"));
export const useNotifications = useStoreFactory(
  notificationsStore,
  useState,
  useEffect
);

/**
 * Add Notification
 */
export const notify = actions.simple<Notification>("NOTIFY");
export const successNotice = (title: string, message?: string) =>
  notify({ type: "success", title, message });
export const failureNotice = (title: string, message?: string) =>
  notify({ type: "failure", title, message });
export const infoNotice = (title: string, message?: string) =>
  notify({ type: "info", title, message });

const notifyReducer = caseFn(notify, (s: State, { value }) => ({
  ...s,
  notifications: [value, ...s.notifications],
}));
const notifyTimeoutRunEvery = filterEvery(notify, (_, { value }) =>
  of(close(value)).pipe(delay(1000))
);
notificationsStore
  .addReducers(notifyReducer)
  .addRunEverys(notifyTimeoutRunEvery);

/**
 * Remove Notification
 */
export const close = actions.simple<Notification>("CLOSE");
const closeReducer = caseFn(close, (s: State, { value }) => ({
  ...s,
  notifications: s.notifications.filter((n) => n !== value),
}));
notificationsStore.addReducers(closeReducer);

/**
 * Selectors
 */
export const selectNotifications = (s: State) => s.notifications;
