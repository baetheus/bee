import { h } from "preact";
import { Link } from "preact-router/match";
import { GiTreeBeehive } from "react-icons/gi";
// import { FaGithub } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

export const Header = () => {
  return (
    <h1 class="fld-row flg-4 jc-spb ai-ctr ff-head">
      <Link href="/" aria-label="Game list" class="fld-row flg-4">
        <span class="ct-rev-honey">
          <GiTreeBeehive />
        </span>
        <span>bee</span>
      </Link>

      <section class="fld-row flg-5 ai-ctr jc-ctr">
        {/* <a
          class="ct-rev-honey-dark ct-rev-honey-on-hover sq-px32 fs-d1 fld-row ai-ctr jc-ctr"
          href="https://github.com/baetheus/bee"
        >
          <FaGithub />
        </a> */}

        <Link
          class="ct-rev-honey-dark ct-rev-honey-on-hover sq-px32 fs-d1 fld-row ai-ctr jc-ctr"
          activeClassName="cf-honey-dark"
          href="/settings"
        >
          <MdSettings />
        </Link>
      </section>
    </h1>
  );
};
