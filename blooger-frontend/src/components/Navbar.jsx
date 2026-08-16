import { NavLink,Link } from "react-router-dom";

export default function Navbar() {

  const navClass = ({ isActive }) =>
    `
      relative
      px-4
      py-2
      text-sm
      font-medium
      tracking-wide
      transition-colors
      duration-200
      ${
        isActive
          ? "text-emerald-400"
          : "text-slate-400 hover:text-slate-100"
      }
    `;

  return (
    <nav className="h-16 bg-[#0b0f0e] border-b border-[#1c2925]">

      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="
            text-xl
            font-bold
            tracking-tight
            text-slate-100
            hover:text-emerald-400
            transition-colors
          "
        >
          blooger<span className="text-emerald-400">.</span>
        </Link>


        {/* NAVIGATION */}

        <div className="flex items-center gap-2">

          <NavLink
            to="/"
            className={navClass}
          >
            HOME
          </NavLink>


          <NavLink
            to="/write"
            className={navClass}
          >
            CREATE
          </NavLink>


          <NavLink
            to="/profile"
            className={navClass}
          >
            PROFILE
          </NavLink>

        </div>

      </div>

    </nav>
  );
}