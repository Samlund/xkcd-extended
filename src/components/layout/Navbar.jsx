import { NavLink } from "react-router";

function Navbar() {
  return (
    <div>
      <div className="flex flex-row justify-between px-5 bg-foreground h-[6vh]">
        <div className="flex-2 flex items-center">
          <NavLink
            to="/"
            className="text-background text-2xl font-bold"
          >
            XKCD EXTENDED
          </NavLink>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <NavLink
            to="/comicstrips/random"
            className="text-secondary text-lg font-semibold"
          >
            RANDOM
          </NavLink>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <NavLink
            to="/favorites"
            className="text-secondary text-lg font-semibold"
          >
            FAVORITES
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
