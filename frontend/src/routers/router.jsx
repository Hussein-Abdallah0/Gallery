import React from "react";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import SideBar from "../components/SideBar/Sidebar";

const router = createHashRouter([
  {
    path: "/",
    element: <App />, // Main layout component
    children: [
      {
        path: "/", // Home route for '/'
        element: <SideBar />,
      },
      {
        path: "/home", // Home route for '/'
        element: <Home />,
      },
      {
        path: "/signup", // Home route for '/'
        element: <Signup />,
      },
    ],
  },
]);

export default router;
