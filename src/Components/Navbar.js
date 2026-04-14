import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload(); 
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/add">Add Recipe</Link> |{" "}

      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;