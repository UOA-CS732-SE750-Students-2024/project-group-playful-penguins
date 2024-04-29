export const colors = {
  TAKE_OUT_COLOR: {
    PRIMARY_COLOR: "#77695E",
    SECONDARY_COLOR: "#FBEFF1",
  },
  COOK_AT_HOME_COLOR: {
    PRIMARY_COLOR: "#00665E",
    SECONDARY_COLOR: "#CCF5F1",
  },
};

export const FILTERS = {
  CALORIE_COUNT: {
    NAME: "Calorie Count",
    INITIAL_VALUE: [20, 30],
    MIN_AND_MAX_VALUE: [0, 100],
    STATE_KEY: "calorieCountValues",
  },
  PREP_TIME: {
    NAME: "Prep Time",
    INITIAL_VALUE: [15, 45],
    MIN_AND_MAX_VALUE: [0, 120],
    STATE_KEY: "prepTimeValues",
  },
  COOKING_TIME: {
    NAME: "Cooking Time",
    INITIAL_VALUE: [30, 90],
    MIN_AND_MAX_VALUE: [0, 180],
    STATE_KEY: "cookingTimeValues",
  },
  PRICE: {
    NAME: "Price",
    INITIAL_VALUE: [10, 100],
    MIN_AND_MAX_VALUE: [0, 500],
    STATE_KEY: "priceValues",
  },
  DELIVERY_TIME: {
    NAME: "Delivery Time",
    INITIAL_VALUE: [1, 7],
    MIN_AND_MAX_VALUE: [0, 14],
    STATE_KEY: "deliveryTimeValues",
  },
  DIET_REQUIREMENT: {
    NAME: "Diet Requirement",
    INITIAL_VALUE: "Choose a diet requirement",
    STATE_KEY: "selectedRequirement",
    OPTIONS: [
      { id: "vegan", name: "Vegan" },
      { id: "glutenFree", name: "Gluten-free" },
      { id: "lactoseIntolerance", name: "Lactose intolerance" },
      { id: "glutenIntolerance", name: "Gluten intolerance" },
    ],
  },
};
