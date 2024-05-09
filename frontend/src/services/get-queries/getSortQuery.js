import { SORT_BY } from "../../constants/filters-constant";

export const getSortQuery = (selectedSortByOption) => {
  const { key, sortBy, sortOrder } = selectedSortByOption;

  if (key === SORT_BY.INITIAL_VALUE.key) {
    return "sortBy=&sortOrder=";
  }

  return `sortBy=${sortBy}&sortOrder=${sortOrder}`;
};
