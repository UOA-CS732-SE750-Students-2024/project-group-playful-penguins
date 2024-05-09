export const getSearchQuery = (searchTerm) => {
  return searchTerm ? `searchTerm=${searchTerm}` : "searchTerm=";
};
