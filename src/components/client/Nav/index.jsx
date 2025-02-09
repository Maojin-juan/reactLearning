import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <Link className="h4 mx-2 mt-5" to="/">
        首頁
      </Link>
      <Link className="h4 mx-2 mt-5" to="/product">
        產品頁面
      </Link>
      <Link className="h4 mx-2 mt-5" to="/cart">
        購物車頁面
      </Link>
      <Link className="h4 mx-2 mt-5" to="/login">
        登入頁面
      </Link>
    </>
  );
}
