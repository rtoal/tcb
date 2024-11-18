import "./RecipeList.css";

export default function RecipeList({ recipes, action }) {
  return (
    <section id="searchResults">
      {recipes.map((recipe) => (
        <article key={recipe.idMeal} onClick={() => action(recipe.idMeal)}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h2>{recipe.strMeal}</h2>
        </article>
      ))}
    </section>
  );
}
