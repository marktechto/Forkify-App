import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import ResultView from "./views/resultView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
if (module.hot) {
  module.hot.accept();
}

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
    console.error(err);
    recipeView.renderError(`Error: ${err.message}`);
  }
};

const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    console.log(model.state.search.results);
    // ResultView.render(model.state.search.results);
    ResultView.render(model.getSearchResultsPage(1));
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
