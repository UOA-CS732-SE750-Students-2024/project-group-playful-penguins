import { FILTERS } from "../constants/filters-constant";

export const createInitialFilterState = (filterConfig) => {
  const filterKeys = FILTERS[filterConfig];
  const initialState = {};

  Object.keys(filterKeys).forEach((key) => {
    const filterDetails = filterKeys[key];
    initialState[filterDetails.STATE_KEY] = filterDetails.INITIAL_VALUE;
  });

  return initialState;
};
