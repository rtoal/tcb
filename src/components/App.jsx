import { useEffect, useState } from "react";
import "./App.css";
import Search from "./Search";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import { useAuthentication } from "../services/authService";
import {
  fetchRecipeById,
  fetchRecipes,
  fetchNameAndUrl,
} from "../services/recipeService";
import { fetchFavorites } from "../services/favoritesService";
import Header from "./Header";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const user = useAuthentication();

  useEffect(() => {
    setRecipe(null);
    fetchRecipes(searchTerm).then(setRecipes);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    if (recipeId) fetchRecipeById(recipeId).then(setRecipe);
  }, [recipeId]);

  function startOver() {
    setRecipeId(null);
    setRecipe(null);
    setSearchTerm("");
    setRecipes([]);
  }

  async function showMyFavorites() {
    setRecipeId(null);
    setRecipe(null);
    setSearchTerm("");
    setRecipes([]);
    fetchFavorites().then(async (recipes) => {
      for (let r of recipes) {
        let [name, url] = await fetchNameAndUrl(r.idMeal);
        r.strMealThumb = url;
        r.strMeal = name;
      }
      setRecipes(recipes);
    });
  }

  return (
    <>
      <Header action={startOver} user={user} />
      <Search action={setSearchTerm} />
      <p onClick={showMyFavorites}>or show me my favorites</p>
      {recipe ? (
        <Recipe recipe={recipe} user={user} />
      ) : (
        <RecipeList recipes={recipes} action={setRecipeId} />
      )}
    </>
  );
}
