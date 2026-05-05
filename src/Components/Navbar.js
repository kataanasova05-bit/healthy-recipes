import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")=== "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="header">
       <div className="logo-container">
       <img src="/images/logo_recipes.png" alt="logo" className="logo-img" />
    <h1 className="logo-text">Healthy Recipes</h1>
  </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favorites">Favorites ❤️</Link></li>

          {isLoggedIn && (
            <li><Link to="/add">Add Recipe</Link></li>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;