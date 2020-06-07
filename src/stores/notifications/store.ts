import { useState, useEffect } from "preact/hooks";
import { fromNullable } from "fp-ts/es6/Option";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { caseFn } from "@nll/dux/Reducers";
import { createStore } from "@nll/dux/Store";
import { useStoreFactory } from "@nll/dux/React";

import { logger } from "../../libs/dux";

import type { State, Notification } from "./models";
import { createSelector } from "reselect";

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
  notifications: s.notifications.concat(value),
}));
notificationsStore.addReducers(notifyReducer);

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
export const selectNotification = createSelector(
  (s: State) => s.notifications,
  (ns) => fromNullable(ns[0])
);
