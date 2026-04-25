import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setCalories(data.calories);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        title,
        calories
      })
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <h1>Edit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditRecipe;