export const getSearchQuery = (searchTerm) => {
  return searchTerm
    ? `searchTerm=${encodeURIComponent(searchTerm)}`
    : "searchTerm=";
};
