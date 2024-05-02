import { FILTERS } from "../../constants/styles-constant";

export const getTakeoutFilterQuery = (filters) => {
  const queryParams = [];

  Object.keys(filters).map((key) => {
    if (
      filters[key] !== FILTERS.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.DIET_REQUIREMENT.STATE_KEY
    ) {
      queryParams.push(`${key}=${filters[key]}`);
      console.log(`${key}=${filters[key]}`);
    } else if (
      filters[key] === FILTERS.DIET_REQUIREMENT.INITIAL_VALUE &&
      key === FILTERS.DIET_REQUIREMENT.STATE_KEY
    ) {
      // Do nothing
    } else {
      if (key !== FILTERS.COOKING_TIME.STATE_KEY) {
        if (
          key === FILTERS.DELIVERY_TIME.STATE_KEY ||
          key === FILTERS.PRICE.STATE_KEY
        ) {
          // TODO remove this if statement, I am testing the function, because we do not have some filter in database, I am using healthScore to do the filter now
          queryParams.push(`${key}Min=${filters[key][0]}`);
          queryParams.push(`${key}Max=${filters[key][1]}`);
        }
      }
    }
  });
  return queryParams.join("&");
};
