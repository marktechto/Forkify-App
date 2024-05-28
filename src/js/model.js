import { async } from "regenerator-runtime";
export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok)
      throw new Error(`${data.message} 
   (${res.status})`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
    };

    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
