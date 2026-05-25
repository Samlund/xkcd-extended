import { NavLink } from "react-router";

function Navbar() {
  return (
    <div>
      <div className="flex flex-row justify-between px-5 bg-(--foreground) h-[6vh] sm:h-[8vh]">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="text-white sm:text-2xl text-lg font-semibold"
          >
            MY XKCDS
          </NavLink>
        </div>
        <div className="flex items-center">
          <NavLink
            to="/comicstrips/random"
            className="text-white sm:text-2xl text-lg font-semibold"
          >
            RANDOM
          </NavLink>
        </div>
        <div className="flex items-center">
          <NavLink
            to="/favorites"
            className="text-white sm:text-2xl text-lg font-semibold"
          >
            FAVORITES
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
