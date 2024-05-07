export const getTakeoutCalorieFilterQuery = (
  minCalorieValues,
  maxCalorieValues
) => {
  return {
    calories: {
      $gte: parseInt(minCalorieValues),
      $lte: parseInt(maxCalorieValues),
    },
  };
};
