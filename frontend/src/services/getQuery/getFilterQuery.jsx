import { FILTERS } from "../../constants/styles-constant";

export const getFilterQuery = (filters) => {
  const queryParams = [];

  const dietRequirement = filters[FILTERS.DIET_REQUIREMENT.STATE_KEY];

  if (dietRequirement !== FILTERS.DIET_REQUIREMENT.INITIAL_VALUE) {
    queryParams.push(`dietRequirement=${dietRequirement}`);
  }

  return queryParams.join("&");
};
