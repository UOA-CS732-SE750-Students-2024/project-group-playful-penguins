export const getTakeoutSearchQuery = (searchTerm) => {
  return { dish_name: { $regex: searchTerm, $options: "i" } };
};
