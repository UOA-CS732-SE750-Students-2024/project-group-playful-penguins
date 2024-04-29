import { SORT_BY } from "../../constants/styles-constant";

export const getSortQuery = (selectedSortByOption) => {
  const { key, sortBy, sortOrder } = selectedSortByOption;

  if (key === SORT_BY.INITIAL_VALUE.key) {
    return "";
  }

  return `sortBy=${sortBy}&sortOrder=${sortOrder}`;
};
