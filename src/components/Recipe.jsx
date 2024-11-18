import "./Recipe.css";

export default function Recipe({ recipe }) {
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
    </section>
  );
}
