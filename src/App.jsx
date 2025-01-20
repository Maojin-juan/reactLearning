import { HashRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Week1 from "./pages/week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/week1" element={<Week1 />} />
          <Route path="/week2" element={<Week2 />} />
          <Route path="/week3" element={<Week3 />} />
          <Route path="/week4" element={<Week4 />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
