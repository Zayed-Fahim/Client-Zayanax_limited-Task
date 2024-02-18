import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/components/Home/Home";
import SignUp from "../pages/components/Home/SignUp";
import Cart from "../pages/components/Home/Cart";
import Dashboard from "../layout/Dashboard/Dashboard";
import OrdersPage from "../pages/components/Dashboard/OrdersPage";
import ProductsPage from "../pages/components/Dashboard/ProductsPage";
import PromoCodesPage from "../pages/components/Dashboard/PromoCodesPage";
import AddPromoCode from "../pages/components/Dashboard/AddPromoCode";
import AddProduct from "../pages/components/Dashboard/AddProduct";
import AdminPanel from "../pages/components/Dashboard/AdminPanel";

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
    {
      path: "/admin-panel",
      element: <AdminPanel />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard/promotion/promo-codes",
          element: <PromoCodesPage />,
        },
        {
          path: "/dashboard/promotion/add-promo-codes",
          element: <AddPromoCode />,
        },
        {
          path: "/dashboard/orders",
          element: <OrdersPage />,
        },
        {
          path: "/dashboard/products",
          element: <ProductsPage />,
        },
        {
          path: "/dashboard/products/add-new-products",
          element: <AddProduct />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
