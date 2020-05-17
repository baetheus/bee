import { h } from "preact";
import { Link } from "preact-router/match";
import { GiTreeBeehive } from "react-icons/gi";

export const Header = () => {
  return (
    <h1>
      <Link href="/" aria-label="Game list" class="fld-row flg-4">
        <span class="ct-rev-honey">
          <GiTreeBeehive />
        </span>
        <span>bee</span>
      </Link>
    </h1>
  );
};
