import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar, Utensils, LogOut } from "lucide-react"; // Import icons
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Gastrotrack</h2>

      <nav className="nav-container">
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">
              <Home size={18} className="icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/daily-diet-logs">
              <Calendar size={18} className="icon" /> Daily Diet Log
            </Link>
          </li>
          <li>
            <Link to="/food-symptom-logs">
              <Utensils size={18} className="icon" /> Food & Symptom Log
            </Link>
          </li>
        </ul>
      </nav>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} className="icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;