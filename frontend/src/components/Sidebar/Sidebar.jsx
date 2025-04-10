import { Link } from "react-router-dom";
import { Heart, Images, Menu } from "lucide-react";
import "./SideBar.css";

const SideBar = ({ collapsed, setCollapsed }) => {
  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">GALLERY</div>
      <ul className="nav-links">
        <Menu className="menu" onClick={() => setCollapsed(!collapsed)} />
        <li>
          <Link to="/home" className="nav-link">
            <Images />
            {!collapsed && <span className="link-text">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            <Heart />
            {!collapsed && <span className="link-text">Favorites</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
