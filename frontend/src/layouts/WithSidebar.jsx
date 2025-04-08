import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/Sidebar";
import "./Layouts.css";
import { useEffect, useState } from "react";

const WithSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content ${collapsed ? "full-width" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default WithSidebar;
