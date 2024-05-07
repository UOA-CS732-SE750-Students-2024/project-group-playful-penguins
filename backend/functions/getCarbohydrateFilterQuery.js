export const getCarbohydrateFilterQuery = (
  minCarbohydrateValues,
  maxCarbohydrateValues
) => {
  if (minCarbohydrateValues && maxCarbohydrateValues) {
    const query = {
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
    return query;
  }
};
