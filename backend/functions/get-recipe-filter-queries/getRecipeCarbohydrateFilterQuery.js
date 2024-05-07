export const getRecipeCarbohydrateFilterQuery = (
  minCarbohydrateValues,
  maxCarbohydrateValues
) => {
  if (minCarbohydrateValues && maxCarbohydrateValues) {
    return {
      "nutrition.nutrients": {
        $elemMatch: {
          name: "Carbohydrates",
          amount: {
            $gte: parseInt(minCarbohydrateValues),
            $lte: parseInt(maxCarbohydrateValues),
          },
        },
      },
    };
  }
};
