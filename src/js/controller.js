import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
const recipeContainer = document.querySelector(".recipe");
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Loading the recipe
    await model.loadRecipe(id);
    //(2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(`${err}🎆🎆🎆🎆🎆🎆🎆`);
  }
};
const controlSearchResults = async function () {
  try {
    await model.loadSearchResult("pizza");
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
