import { NavLink } from "react-router-dom";

const links = [
  { to: "/series/page/1", label: "Séries" },
  { to: "/movies/page/1", label: "Filmes" },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-cta" : "hover:text-hover duration-200";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-4 text-secondaryText">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={getLinkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
