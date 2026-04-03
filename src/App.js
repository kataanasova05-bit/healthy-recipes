import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(){
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
     .then(res => res.json())
     .then(data => setRecipes(data));
  }, []);
  return(
    <div>
      <h1>Recipes</h1>

      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Calories: {recipe.calories}</p>
        </div>
      ))}
    </div>
  );
}
function Login(){
  return <h1>Login Page</h1>;
}
function Register(){
  return <h1>Register Page</h1>;
}
function AddRecipe(){
  const [title,setTitle]=useState("");
  const [calories,setCalories]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();

    const newRecipe={
      title,
      calories:Number(calories)
    };

    fetch("http://localhost:3001/recipe",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newRecipe)
    }).then(()=>{
      alert("Recipe added!");
      setTitle("");
      setCalories("");
    });
  };

  return(
    <div>
      <h1>Add Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
          <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e)=>setCalories(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
  }
function App(){
  return(
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/add">Add Recipъe</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/add" element={<AddRecipe/>}/>
      </Routes>
    </Router>
  );
}

export default App;