import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/Cart.jsx";
import store from "./store.js";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Shipping from "./screens/Shipping.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Payment from "./screens/Payment.jsx";
import PlaceOrder from "./screens/PlaceOrder.jsx";
import Order from "./screens/Order.jsx";
import StripeSuccess from "./components/StripeSuccess.jsx";
import StripeCancel from "./components/StripeCancel.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/products/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        {/* <Route path='/:id/success' element={<StripeSuccess />} /> */}
        <Route path='/:id/paymentsuccess' element={<StripeSuccess />} />
        <Route path='/:id/cancel' element={<StripeCancel />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
