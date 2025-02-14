import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="container mx-auto flex items-center justify-center py-3">
        <NavLink
          className={({ isActive }) => `mx-2 ${isActive ? "text-sky-400" : ""}`}
          to="/week6"
          end
        >
          首頁
        </NavLink>
        <NavLink
          className={({ isActive }) => `mx-2 ${isActive ? "text-sky-400" : ""}`}
          to="/week6/productList"
        >
          產品頁面
        </NavLink>
        <NavLink
          className={({ isActive }) => `mx-2 ${isActive ? "text-sky-400" : ""}`}
          to="/week6/cart"
        >
          購物車
        </NavLink>
        <NavLink
          className={({ isActive }) => `mx-2 ${isActive ? "text-sky-400" : ""}`}
          to="/week6/login"
        >
          登入
        </NavLink>
      </div>
    </nav>
  );
}
