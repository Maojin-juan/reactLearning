import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Week1 from "./pages/week1";
import Week2 from "./pages/Week2";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="week1" element={<Week1 />} />
          <Route path="week2" element={<Week2 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
