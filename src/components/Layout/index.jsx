import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="my-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
