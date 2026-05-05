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
    <div>
      <h1>Favorites ❤️</h1>

      {favorites.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Calories: {recipe.calories}</p>

          <button onClick={() => removeFromFavorites(recipe.id)}>
            Remove ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;