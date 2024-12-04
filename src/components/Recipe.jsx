import { useState } from "react";
import { login } from "../services/authService";
import { saveFavorite } from "../services/favoritesService";
import "./Recipe.css";

export default function Recipe({ recipe, user }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    await saveFavorite(recipe, user);
    setSaved(true);
  }

  return (
    <section id="recipe">
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strArea}</p>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p id="instructions">{recipe.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(recipe)
          .filter(([key, value]) => key.startsWith("strIngredient") && value)
          .map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
      </ul>
      {!user ? (
        <p onClick={login}>Login to save</p>
      ) : saved ? (
        <button disabled>Saved!</button>
      ) : saving ? (
        <button disabled>Saving...</button>
      ) : (
        <button onClick={save}>Save</button>
      )}
    </section>
  );
}
