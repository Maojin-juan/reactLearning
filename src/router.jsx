import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Week1 from "./pages/week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";
import Week5 from "./pages/week5";
import Week6 from "./pages/week6";
import ProductList from "./components/client/ProductList";
import Cart from "./components/client/Cart";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "week1",
        element: <Week1 />,
      },
      {
        path: "week2",
        element: <Week2 />,
      },
      {
        path: "week3",
        element: <Week3 />,
      },
      {
        path: "week4",
        element: <Week4 />,
      },
      {
        path: "week5",
        element: <Week5 />,
      },
      {
        path: "week6",
        element: <Week6 />,
        children: [
          {
            index: true,
            element: <Home week={6} />,
          },
          {
            path: "productList",
            element: <ProductList />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "login",
            element: <Week4 />,
          },
        ],
      },
    ],
  },
]);
