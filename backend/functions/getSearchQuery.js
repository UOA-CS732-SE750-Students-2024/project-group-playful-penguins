export const getSearchQuery = (searchTerm) => {
  return { title: { $regex: new RegExp(searchTerm, "i") } };
};
