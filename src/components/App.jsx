import { useEffect, useState } from "react";
import "./App.css";
import Search from "./Search";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";
import { useAuthentication } from "../services/authService";
import { fetchRecipeById, fetchRecipes } from "../services/recipeService";

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

  return (
    <>
      <h1>Cookbook</h1>
      <Search action={setSearchTerm} />
      {recipe ? (
        <Recipe recipe={recipe} />
      ) : (
        <RecipeList recipes={recipes} action={setRecipeId} />
      )}
    </>
  );
}
