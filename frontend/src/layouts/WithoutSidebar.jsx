import { Outlet } from "react-router-dom";
import "./Layouts.css";

const WithoutSidebar = () => {
  return (
    <div className="app-container">
      <div className="main-content full-width">
        <Outlet />
      </div>
    </div>
  );
};

export default WithoutSidebar;
