export const getTakeoutFoodPriceFilterQuery = (
  minFoodPriceValues,
  maxFoodPriceValues
) => {
  if (minFoodPriceValues && maxFoodPriceValues) {
    return {
      price: {
        $gte: minFoodPriceValues,
        $lte: maxFoodPriceValues,
      },
    };
  }
};
