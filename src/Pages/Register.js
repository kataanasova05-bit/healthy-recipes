import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Добавен Link
import "../styles/AddRecipes.css"; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="add-page">
      <form className="recipe-form" onSubmit={handleRegister}>
        <h1>Register</h1>
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
        <button type="submit">Register</button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login" style={{ color: "#32a545" }}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;