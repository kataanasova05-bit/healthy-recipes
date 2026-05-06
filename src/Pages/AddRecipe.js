import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddRecipes.css";

function AddRecipe() {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !calories ||
      !image ||
      !ingredients ||
      !instructions
    ) {
      alert("Fill all fields");
      return;
    }

    const newRecipe = {
      title,
      calories: Number(calories),
      image,
      ingredients,
      instructions
    };

    fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRecipe)
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="add-page">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h1>Add Recipe</h1>

        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <textarea
          placeholder="How to prepare"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;