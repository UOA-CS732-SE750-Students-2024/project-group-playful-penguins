export const getTakeoutCalorieFilterQuery = (
  minCalorieValues,
  maxCalorieValues
) => {
  if (minCalorieValues && maxCalorieValues) {
    return {
      calories: {
        $gte: parseInt(minCalorieValues),
        $lte: parseInt(maxCalorieValues),
      },
    };
  }
};
