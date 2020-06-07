export interface Notification {
  type: "success" | "failure" | "info";
  title: string;
  message?: string;
}

export interface State {
  notifications: Notification[];
}
