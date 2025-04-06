import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const router = createHashRouter([
  {
    path: "/",
    element: <App />, // Main layout component
    children: [
      {
        path: "/", // Home route for '/'
        element: <Login />,
      },
      {
        path: "/home", // Home route for '/'
        element: <Home />,
      },
    ],
  },
]);

export default router;
