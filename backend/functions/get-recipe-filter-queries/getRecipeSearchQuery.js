export const getRecipeSearchQuery = (searchTerm) => {
  if (searchTerm) {
    return { title: { $regex: searchTerm, $options: "i" } };
  }
};
