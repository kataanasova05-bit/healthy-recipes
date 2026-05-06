import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const addToFavorites = (recipe) => {
    let fav = JSON.parse(localStorage.getItem("fav") || "[]");

    const exists = fav.find(r => r.id === recipe.id);

    if (!exists) {
      fav.push(recipe);
      localStorage.setItem("fav", JSON.stringify(fav));
    }
  };

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

      <div className="search-container">
  <input
    type="text"
    placeholder="🔍 Search recipes..."
    className="search-input"
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="filter-select"
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="all">All</option>
    <option value="low">Low calories</option>
    <option value="high">High calories</option>
  </select>
</div>
      <div className="grid">
        {recipes.length === 0 ? (
          <p>No recipes yet</p>
        ) : (
          recipes
            .filter(recipe => {
  // 1. Предпазна проверка: ако рецептата или заглавието липсват, пропускаме
  if (!recipe || !recipe.title) return false;

  // 2. Търсене (безопасно)
  const matchesSearch = recipe.title
    .toLowerCase()
    .includes((search || "").toLowerCase());

  // 3. Филтър за калории
  let matchesFilter = true;
  if (filter === "low") matchesFilter = recipe.calories < 200;
  if (filter === "high") matchesFilter = recipe.calories >= 200;

  return matchesSearch && matchesFilter;
})
            .map(recipe => {
              const fav = JSON.parse(localStorage.getItem("fav") || "[]");
              const isFav = fav.some(r => r.id === recipe.id);

              return (
                <div className="card" key={recipe.id}>
                  <img
                    src={recipe.image || "/images/default.png"}
                    alt={recipe.title}
                  />

                  <h3>{recipe.title}</h3>
                  <p>{recipe.calories} calories</p>

                  <div className="buttons">
                    <button onClick={() => navigate(`/edit/${recipe.id}`)}>
                      Edit
                    </button>

                    <button onClick={() => handleDelete(recipe.id)}>
                      Delete
                    </button>

                    <button onClick={() => addToFavorites(recipe)}>
                      {isFav ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Home;