export const getTakeoutSearchQuery = (searchTerm) => {
  if (searchTerm) {
    return { dish_name: { $regex: searchTerm, $options: "i" } };
  }
};
