import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Добавен Link[cite: 5]
import "../styles/AddRecipes.css"; // Използваме стила за формите[cite: 1]

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="add-page">
      <form className="recipe-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <Link to="/register" style={{ color: "#32a545" }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;