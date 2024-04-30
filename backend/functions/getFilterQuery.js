export const getFilterQuery = (req) => {
  const {
    calorieCountValuesMin,
    calorieCountValuesMax,
    prepTimeValuesMin,
    prepTimeValuesMax,
    cookingTimeValuesMin,
    cookingTimeValuesMax,
    selectedRequirement,
  } = req.query;
  let query = {};

  if (cookingTimeValuesMin && cookingTimeValuesMax) {
    query.healthScore = {
      $gte: parseInt(cookingTimeValuesMin),
      $lte: parseInt(cookingTimeValuesMax),
    };
  }
  // TODO get the calorie count and prep time and cooking time from backend now we are using healthy score

  if (selectedRequirement) {
    query[selectedRequirement] = true;
  }
  console.log(query);
  return query;
};
