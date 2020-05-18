import { h } from "preact";
import { Link } from "preact-router/match";
import { GiTreeBeehive } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

export const Header = () => {
  return (
    <h1 class="fld-row flg-4 jc-spb ai-ctr">
      <Link href="/" aria-label="Game list" class="fld-row flg-4">
        <span class="ct-rev-honey">
          <GiTreeBeehive />
        </span>
        <span>bee</span>
      </Link>

      <a
        class="fs-d2 ct-rev-honey-dark ct-rev-honey-on-hover"
        href="https://github.com/baetheus/bee"
      >
        <FaGithub />
      </a>
    </h1>
  );
};
