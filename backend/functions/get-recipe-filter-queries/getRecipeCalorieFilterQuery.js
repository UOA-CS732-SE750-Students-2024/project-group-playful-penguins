export const getRecipeCalorieFilterQuery = (
  minCalorieValues,
  maxCalorieValues
) => {
  console.log(minCalorieValues, maxCalorieValues);
  if (minCalorieValues && maxCalorieValues) {
    const query = {
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
    return query;
  }
};
