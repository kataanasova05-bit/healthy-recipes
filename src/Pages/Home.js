import { useEffect, useState } from "react";

function Home() {
  const [recipes, setRecipes] = useState([]);
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
        console.log("DATA:", data); // 👈 важно
        setRecipes(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>

      {recipes.length === 0 ? (
        <p>Loading...</p>
      ) : (
       recipes.map(recipe => (
       <div key={recipe.id}>
    <   h3>{recipe.title}</h3>
       <p>Calories: {recipe.calories}</p>

       <button onClick={() => handleDelete(recipe.id)}>
        Delete
       </button>
      </div>
      ))
      )}
    </div>
  );
}

export default Home;