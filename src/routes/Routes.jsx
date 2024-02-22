import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard/Dashboard";
import Main from "../layout/Main/Main";
import AddProduct from "../pages/components/Dashboard/AddProduct";
import AddPromoCode from "../pages/components/Dashboard/AddPromoCode";
import AdminPanel from "../pages/components/Dashboard/AdminPanel";
import OrdersPage from "../pages/components/Dashboard/OrdersPage";
import ProductsPage from "../pages/components/Dashboard/ProductsPage";
import PromoCodesPage from "../pages/components/Dashboard/PromoCodesPage";
import Cart from "../pages/components/Home/Cart";
import Home from "../pages/components/Home/Home";
import SignUp from "../pages/components/Home/SignUp";
import PrivateRoute from "./PrivateRoute";
import EditablePromoCode from "../pages/reuseableComponents/EditablePromoCode";
import EditableProductCardForm from "../pages/reuseableComponents/EditableProductCardForm";

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
      path: "/auth/sign-up",
      element: <SignUp />,
    },
    {
      path: "/auth/admin-panel",
      element: <AdminPanel />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/dashboard/promotion/promo-codes",
          element: (
            <PrivateRoute>
              <PromoCodesPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/promotion/add-new-promo-code",
          element: (
            <PrivateRoute>
              <AddPromoCode />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/promotion/add-new-promo-code/mode=editing",
          element: (
            <PrivateRoute>
              <EditablePromoCode />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/orders",
          element: (
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/products",
          element: (
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/products/add-new-product",
          element: (
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          ),
        },
        {
          path: "/dashboard/products/add-new-product/mode=editing",
          element: (
            <PrivateRoute>
              <EditableProductCardForm />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
