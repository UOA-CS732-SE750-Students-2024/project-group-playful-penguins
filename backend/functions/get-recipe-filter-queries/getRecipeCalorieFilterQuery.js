export const getRecipeCalorieFilterQuery = (
  minCalorieValues,
  maxCalorieValues
) => {
  if (minCalorieValues && maxCalorieValues) {
    return {
      "nutrition.nutrients": {
        $elemMatch: {
          name: "Calories",
          amount: {
            $gte: parseInt(minCalorieValues),
            $lte: parseInt(maxCalorieValues),
          },
        },
      },
    };
  }
};
