import { FILTERS } from "../../constants/filters-constant";

export const getFilterQuery = (filters) => {
  const queryParams = [];

  Object.keys(filters).map((key) => {
    if (
      // To get the diet requirements, as they are just a string instead of a array/range e.g. [0, 10]]
      key === FILTERS.RECIPE_FILTER.DIET_REQUIREMENT.STATE_KEY ||
      key === FILTERS.TAKEOUT_FILTER.DIET_REQUIREMENT.STATE_KEY
    ) {
      queryParams.push(`${key}=${filters[key]}`);
    } else {
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
