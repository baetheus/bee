import { h, FunctionalComponent } from "preact";

export const DefaultLayout: FunctionalComponent<{}> = ({ children }) => (
  <main class="vwcmx-px500 vwc-p100 fld-col flg-4 ai-ctr pwa-4">
    {children}
  </main>
);
