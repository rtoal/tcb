export async function fetchRecipes(searchTerm) {
  if (!searchTerm) {
    return [];
  }
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
  return fetch(`${baseUrl}?c=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((data) => data.meals || []);
}

export async function fetchRecipeById(id) {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php";
  return fetch(`${baseUrl}?i=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => data.meals[0]);
}

export async function fetchNameAndUrl(id) {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php";
  return fetch(`${baseUrl}?i=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => [data.meals[0].strMeal, data.meals[0].strMealThumb]);
}
