import { useEffect, useState } from "react";

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

export default Home;