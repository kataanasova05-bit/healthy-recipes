import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddRecipes.css"; // Използваме същия стил!

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setCalories(data.calories);
        setImage(data.image);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = { 
      id, title, calories: Number(calories), image, ingredients, instructions 
    };

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe)
    }).then(() => navigate("/"));
  };

  return (
    <div className="add-page">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h1>Edit Recipe</h1>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" />
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
export default EditRecipe;