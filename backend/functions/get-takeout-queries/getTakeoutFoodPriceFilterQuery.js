export const getTakeoutFoodPriceFilterQuery = (
  minFoodPriceValues,
  maxFoodPriceValues
) => {
  return {
    price: {
      $gte: minFoodPriceValues,
      $lte: maxFoodPriceValues,
    },
  };
};
