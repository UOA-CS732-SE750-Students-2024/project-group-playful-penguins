export const getRecipeCookingTimeFilterQuery = (
  minCookingTimeValues,
  maxCookingTimeValues
) => {
  if (minCookingTimeValues && maxCookingTimeValues) {
    return {
      readyInMinutes: {
        $gte: parseInt(minCookingTimeValues),
        $lte: parseInt(maxCookingTimeValues),
      },
    };
  }
};
