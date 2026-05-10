import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="Nav-bar">
      <div className="Nav-container">
        <h1 className="logo">
          RED<span>-</span>Track
        </h1>
        <ul className="Nav-items">
          <Link
            className={`Nav-links ${location.pathname === "/" ? "active" : ""}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`Nav-links ${location.pathname === "/Pastpapers" ? "active" : ""}`}
            to="/Pastpapers"
          >
            Course Papers
          </Link>
          <Link
            className={`Nav-links ${location.pathname === "/TeacherReview" ? "active" : ""}`}
            to="/TeacherReview"
          >
            Teachers Review
          </Link>
          <Link
            className={`Nav-links ${location.pathname === "/GpaCalculator" ? "active" : ""}`}
            to="/GpaCalculator"
          >
            GPA Calculator
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
