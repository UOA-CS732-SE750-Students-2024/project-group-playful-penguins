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
      queryParams.push(`${key}=`);
    } else if (
      key === FILTERS.CALORIE.STATE_KEY ||
      key === FILTERS.FOOD_PRICE.STATE_KEY ||
      key === FILTERS.DELIVERY_FEE.STATE_KEY
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
