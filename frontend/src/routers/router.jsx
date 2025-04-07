import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import WithoutSidebar from "../layouts/WithoutSidebar";
import WithSidebar from "../layouts/WithSidebar";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // Routes WITHOUT sidebar
        element: <WithoutSidebar />,
        children: [
          { path: "/", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
      {
        // Routes WITH sidebar
        element: <WithSidebar />,
        children: [{ path: "/home", element: <Home /> }],
      },
    ],
  },
]);

export default router;
