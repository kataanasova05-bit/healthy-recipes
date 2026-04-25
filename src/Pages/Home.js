import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/recipes/${id}`, {
      method: "DELETE"
    }).then(() => {
      setRecipes(recipes.filter(r => r.id !== id));
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/recipes")
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes yet</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Calories: {recipe.calories}</p>

            <img src={recipe.image} alt={recipe.title} width="200" />

            <button onClick={() => handleDelete(recipe.id)}>
              Delete
            </button>
            <button onClick={() => navigate(`/edit/${recipe.id}`)}>
             Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;