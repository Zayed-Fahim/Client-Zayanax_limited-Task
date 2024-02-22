import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./providers/AuthProvider";
import CommonProvider from "./providers/CommonProvider";
import ProductSearchProvider from "./providers/ProductSearchProvider";
import ProductProvider from "./providers/ProductProvider";
import PromoCodeProvider from "./providers/PromoCodeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CommonProvider>
        <ProductProvider>
          <PromoCodeProvider>
            <ProductSearchProvider>
              <App />
            </ProductSearchProvider>
          </PromoCodeProvider>
        </ProductProvider>
      </CommonProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
