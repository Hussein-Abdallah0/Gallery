import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">GALLERY</div>
      <ul className="nav-links">
        <li>
          <Link to="/home" className="nav-link">
            <span className="link-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            <span className="link-text">Favorites</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
