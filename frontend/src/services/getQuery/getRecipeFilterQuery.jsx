import { FILTERS } from "../../constants/styles-constant";

export const getRecipeFilterQuery = (filters) => {
  const queryParams = [];

  Object.keys(filters).map((key) => {
    if (
      filters[key] !== FILTERS.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.DIET_REQUIREMENT.STATE_KEY
    ) {
      queryParams.push(`${key}=${filters[key]}`);
    } else if (
      filters[key] === FILTERS.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.DIET_REQUIREMENT.STATE_KEY
    ) {
    } else {
      queryParams.push(`${key}Min=${filters[key][0]}`);
      queryParams.push(`${key}Max=${filters[key][1]}`);
    }
  });
  return queryParams.join("&");
};
