import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Week1 from "./pages/week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";
import Week5 from "./pages/week5";
import Week6 from "./pages/week6";
import CartPage from "./pages/week6/cart";
import ProductListPage from "./pages/week6/product";

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
            element: <ProductListPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "login",
            element: <Week4 />,
          },
        ],
      },
      {
        path: "week7",
        element: <Week6 />,
        children: [
          {
            index: true,
            element: <Home week={7} />,
          },
        ],
      },
    ],
  },
]);
