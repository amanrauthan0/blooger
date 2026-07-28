import { NavLink,Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex space-x-40 p-3">
      <NavLink
      to="/"
       className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >HOME
      </NavLink>
      <NavLink to="/write"
      className={({ isActive }) =>
          isActive ? "active" : ""
        }>
       CREATE 
       </NavLink>

       <NavLink to="/profile"
      className={({ isActive }) =>
          isActive ? "active" : ""
        }>
       PROFILE
       </NavLink>

    </nav>
  );
}
