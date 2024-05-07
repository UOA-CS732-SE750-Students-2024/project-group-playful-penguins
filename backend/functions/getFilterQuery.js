export const getFilterQuery = (req) => {
  const {
    mincalorieValues,
    maxcalorieValues,
    minCarbohydrateValues,
    maxCarbohydrateValues,
    minCookingTimeValues,
    maxCookingTimeValues,
    selectedRequirement,
  } = req.query;

  let conditions = [];

  if (minCarbohydrateValues && maxCarbohydrateValues) {
    conditions.push({
      "nutrition.nutrients": {
        $elemMatch: {
          name: "Carbohydrate",
          amount: {
            $gte: parseInt(minCarbohydrateValues),
            $lte: parseInt(maxCarbohydrateValues),
          },
        },
      },
    });
  }

  if (mincalorieValues && maxcalorieValues) {
    conditions.push({
      "nutrition.nutrients": {
        $elemMatch: {
          name: "Calories",
          amount: {
            $gte: parseInt(mincalorieValues),
            $lte: parseInt(maxcalorieValues),
          },
        },
      },
    });
  }

  if (minCookingTimeValues && maxCookingTimeValues) {
    conditions.push({
      readyInMinutes: {
        $gte: parseInt(minCookingTimeValues),
        $lte: parseInt(maxCookingTimeValues),
      },
    });
  }

  if (selectedRequirement) {
    conditions.push({
      diets: {
        $regex: selectedRequirement,
        $options: "i",
      },
    });
  }

  const query = conditions.length > 0 ? { $and: conditions } : {};

  return query;
};
