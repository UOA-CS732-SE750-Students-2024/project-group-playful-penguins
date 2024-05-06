export const getSortCriteria = (sortBy, sortOrder) => {
  let sortCriteria = {};

  if (sortBy && sortOrder) {
    sortCriteria[sortBy] = sortOrder === "asc" ? 1 : -1;
  }
  return sortCriteria;
};
