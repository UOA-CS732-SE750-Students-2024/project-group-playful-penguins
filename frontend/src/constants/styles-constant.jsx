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

// TODO need to finialise the initial valuse and min&max values
export const FILTERS = {
  CALORIE: {
    NAME: "Calorie",
    INITIAL_VALUE: [0, 20000],
    MIN_AND_MAX_VALUE: [0, 20000],
    STATE_KEY: "calorieValues",
  },
  CARBOHYDRATE: {
    NAME: "Carbohydrate",
    INITIAL_VALUE: [0, 10000],
    MIN_AND_MAX_VALUE: [0, 10000],
    STATE_KEY: "carbohydrateValues",
  },
  COOKING_TIME: {
    NAME: "Cooking Time",
    INITIAL_VALUE: [0, 2000],
    MIN_AND_MAX_VALUE: [0, 20000],
    STATE_KEY: "cookingTimeValues",
  },
  FOOD_PRICE: {
    NAME: "Food price",
    INITIAL_VALUE: [10, 10000],
    MIN_AND_MAX_VALUE: [0, 50000],
    STATE_KEY: "foodPriceValues",
  },
  DELIVERY_FEE: {
    NAME: "Delivery Time",
    INITIAL_VALUE: [1, 700],
    MIN_AND_MAX_VALUE: [0, 1400],
    STATE_KEY: "deliveryFeeValues",
  },
  DIET_REQUIREMENT: {
    NAME: "Diet Requirement",
    INITIAL_VALUE: "Choose a diet requirement",
    STATE_KEY: "selectedRequirement",
    OPTIONS: [
      { id: "vegetarian", name: "Vegetarian", urlKey: "lacto ovo vegetarian" },
      { id: "vegan", name: "Vegan", urlKey: "vegan" },
      { id: "glutenFree", name: "Gluten-free", urlKey: "gluten free" },
      { id: "dairyFree", name: "Dairy-free", urlKey: "dairy free" },
      { id: "lowFODMAP", name: "Low FODMAP", urlKey: "fodmap friendly" },
    ],
  },
};

export const SORT_BY = {
  INITIAL_VALUE: {
    key: "initialValue",
    name: "Sort by",
    sortBy: "",
    sortOrder: "",
  },
  OPTIONS: [
    {
      key: "titleAlphabeticalOrder",
      name: "Name(A-Z)",
      sortBy: "title",
      sortOrder: "asc",
    },
    {
      key: "titleReverseAlphabeticalOrder",
      name: "Name(Z-A)",
      sortBy: "title",
      sortOrder: "desc",
    },
  ],
};
