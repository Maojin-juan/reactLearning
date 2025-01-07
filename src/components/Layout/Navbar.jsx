import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-200 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex w-full justify-between space-x-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <NavLink
              key={index}
              to={`/week${index + 1}`}
              className={({ isActive }) =>
                isActive ? "text-slate-400" : "text-black"
              }
            >
              Week {index + 1}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
