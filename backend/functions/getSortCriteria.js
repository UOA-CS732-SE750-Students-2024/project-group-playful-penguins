export const getSortCriteria = (req) => {
  let sortCriteria = {};

  if (req.query.sortBy && req.query.sortOrder) {
    sortCriteria[req.query.sortBy] = req.query.sortOrder === "asc" ? 1 : -1;
  }
  return sortCriteria;
};
