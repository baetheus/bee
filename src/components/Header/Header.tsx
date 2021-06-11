import { h, Fragment } from "preact";
import { Link } from "preact-router";
import { GiTreeBeehive } from "react-icons/gi";
import { MdSettings, MdHelp } from "react-icons/md";

export const Header = () => {
  return (
    <Fragment>
      <h1 class="fld-row flg-4 jc-spb ai-ctr ff-head">
        <Link href="/" aria-label="Game list" class="fld-row flg-4">
          <span class="ct-rev-honey">
            <GiTreeBeehive />
          </span>
          <span>bee</span>
        </Link>

        <section class="fld-row flg-4 ai-ctr jc-ctr">
          <Link
            class="ct-rev-honey-dark ct-rev-honey-on-hover sq-px32 fs-d1 fld-row ai-ctr jc-ctr"
            href="/help"
          >
            <MdHelp />
          </Link>

          <Link
            class="ct-rev-honey-dark ct-rev-honey-on-hover sq-px32 fs-d1 fld-row ai-ctr jc-ctr"
            activeClassName="cf-honey-dark"
            href="/settings"
          >
            <MdSettings />
          </Link>
        </section>
      </h1>
      <span class="ce-rev-honey cf-rev-honey-dark pwy-4 pwl-5 pwr-4 bwa-1 bra-1 fw-u1 fs-u3 ff-head">Bee is on a hiatus until July 15th 2021.<br />Check back for new puzzlies then!</span>
    </Fragment>
  );
};
