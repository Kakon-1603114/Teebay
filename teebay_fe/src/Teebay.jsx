import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Transections from "./pages/Transections";

export const protectedRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/transactions",
    element: <Transections />,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
