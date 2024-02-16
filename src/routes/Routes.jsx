import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/components/Home/Home";
import SignUp from "../pages/components/Home/SignUp";
import Cart from "../pages/components/Home/Cart";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
