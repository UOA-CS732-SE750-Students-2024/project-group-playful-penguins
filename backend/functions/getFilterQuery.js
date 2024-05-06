export const getFilterQuery = (req) => {
  const {
    // minCalorieCountValues,
    // maxCalorieCountValues,
    // minPrepTimeValues,
    // maxPrepTimeValues,
    minCookingTimeValues,
    maxCookingTimeValues,
    selectedRequirement,
  } = req.query;

  let query = {};
  if (minCookingTimeValues && maxCookingTimeValues) {
    // TODO: need to change healthScore to readyInMinutes
    query.healthScore = {
      // assuming cookingTime is the correct field in your DB
      $gte: parseInt(minCookingTimeValues),
      $lte: parseInt(maxCookingTimeValues),
    };
  }

  if (selectedRequirement) {
    query.diets = { $regex: selectedRequirement, $options: "i" };
  }

  return query;
};
