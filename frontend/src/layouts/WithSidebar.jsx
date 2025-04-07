import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/Sidebar";
import "./Layouts.css";

const WithSidebar = () => {
  return (
    <div className="app-container">
      <SideBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default WithSidebar;
