export const getRecipeCookingTimeFilterQuery = (
  minCookingTimeValues,
  maxCookingTimeValues
) => {
  if (minCookingTimeValues && maxCookingTimeValues) {
    const query = {
      readyInMinutes: {
        $gte: parseInt(minCookingTimeValues),
        $lte: parseInt(maxCookingTimeValues),
      },
    };
    return query;
  }
};
