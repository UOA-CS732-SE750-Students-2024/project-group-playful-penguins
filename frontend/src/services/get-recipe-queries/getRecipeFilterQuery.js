import { FILTERS } from "../../constants/styles-constant";

export const getRecipeFilterQuery = (filters) => {
  const queryParams = [];

  Object.keys(filters).map((key) => {
    if (
      filters[key] !== FILTERS.RECIPE_FILTER.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.RECIPE_FILTER.DIET_REQUIREMENT.STATE_KEY
    ) {
      queryParams.push(`${key}=${filters[key]}`);
      console.log(`${key}=${filters[key]}`);
    } else if (
      filters[key] === FILTERS.RECIPE_FILTER.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.RECIPE_FILTER.DIET_REQUIREMENT.STATE_KEY
    ) {
      queryParams.push(`${key}=`);
    } else if (
      key === FILTERS.RECIPE_FILTER.CALORIE.STATE_KEY ||
      key === FILTERS.RECIPE_FILTER.CARBOHYDRATE.STATE_KEY ||
      key === FILTERS.RECIPE_FILTER.COOKING_TIME.STATE_KEY
    ) {
      queryParams.push(
        `min${key.charAt(0).toUpperCase() + key.slice(1)}=${filters[key][0]}`
      );
      queryParams.push(
        `max${key.charAt(0).toUpperCase() + key.slice(1)}=${filters[key][1]}`
      );
    }
  });
  return queryParams.join("&");
};
