import { Link } from "react-router-dom";
import { Heart, Images, Menu } from "lucide-react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">GALLERY</div>
      <ul className="nav-links">
        <Menu className="menu" />
        <li>
          <Link to="/home" className="nav-link">
            <Images />
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            <Heart />
            <span className="link-text">Favorites</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
