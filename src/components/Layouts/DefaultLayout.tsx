import { h, FunctionalComponent } from "preact";

import { Footer } from "../Footer";
import { Header } from "../Header";

export const DefaultLayout: FunctionalComponent<{}> = ({ children }) => (
  <main class="vhmn-vh100 vwcmx-px500 vwc-p100 fld-col flg-4 ai-ctr pwa-4">
    <Header />
    <section class="vwcmx-px500 vwc-p100 fld-col flg-4 ai-ctr fls-1-1 fls-1-1-last">
      {children}
    </section>
    <Footer />
  </main>
);
