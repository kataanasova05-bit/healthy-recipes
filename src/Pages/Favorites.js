import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav") || "[]");
    setFavorites(fav);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter(r => r.id !== id);
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return <p>No favorite recipes yet ❤️</p>;
  }

  return (
    <div className="grid">
      {favorites.map(recipe => (
        <div className="card" key={recipe.id}>
          <img
            src={recipe.image || "/images/default.png"}
            alt={recipe.title}
          />

          <h2>{recipe.title}</h2>
          <p>{recipe.calories} calories</p>

          <h4>Ingredients:</h4>
          <p>{recipe.ingredients}</p>

          <h4>How to prepare:</h4>
          <p>{recipe.instructions}</p>

          <button onClick={() => removeFromFavorites(recipe.id)}>
            Remove ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;