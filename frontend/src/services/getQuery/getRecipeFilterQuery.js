import { FILTERS } from "../../constants/styles-constant";

export const getRecipeFilterQuery = (filters) => {
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
      queryParams.push(`${key}=`);
    } else {
      if (
        key !== FILTERS.PRICE.STATE_KEY &&
        key !== FILTERS.DELIVERY_TIME.STATE_KEY
      ) {
        if (key === FILTERS.COOKING_TIME.STATE_KEY) {
          // TODO remove this if statement, I am testing the function, because we do not have some filter in database, I am using healthScore to do the filter now
          queryParams.push(
            `min${key.charAt(0).toUpperCase() + key.slice(1)}=${
              filters[key][0]
            }`
          );
          queryParams.push(
            `max${key.charAt(0).toUpperCase() + key.slice(1)}=${
              filters[key][1]
            }`
          );
        }
      }
    }
  });
  return queryParams.join("&");
};
