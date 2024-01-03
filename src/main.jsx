import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Profile from "./components/Profile.jsx";
import AddListing from "./components/AddListing.jsx";
import Login from "./components/Login.jsx";
import EditListing from "./components/EditListing.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
import Checkout from "./components/chekcout.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <App />
      </CartProvider>
    ),
    children: [
      {
        element: <Homepage />,
        index: true,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addlisting",
        element: <AddListing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "editListing",
        element: <EditListing />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
