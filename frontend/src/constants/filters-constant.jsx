export const FILTERS = {
  RECIPE_FILTER: {
    CALORIE: {
      NAME: "Calorie (kcal)",
      INITIAL_VALUE: [0, 2000],
      MIN_AND_MAX_VALUE: [0, 2000],
      STATE_KEY: "calorieValues",
    },
    CARBOHYDRATE: {
      NAME: "Carbohydrate (g)",
      INITIAL_VALUE: [0, 250],
      MIN_AND_MAX_VALUE: [0, 250],
      STATE_KEY: "carbohydrateValues",
    },
    COOKING_TIME: {
      NAME: "Cooking Time (min)",
      INITIAL_VALUE: [0, 150],
      MIN_AND_MAX_VALUE: [0, 150],
      STATE_KEY: "cookingTimeValues",
    },
    DIET_REQUIREMENT: {
      NAME: "Diet Requirement",
      DISPLAY_NAME: "Choose a diet requirement",
      INITIAL_VALUE: "",
      STATE_KEY: "selectedRequirement",
      OPTIONS: [
        {
          id: "vegetarian",
          name: "Vegetarian",
          urlKey: "lacto ovo vegetarian",
        },
        { id: "vegan", name: "Vegan", urlKey: "vegan" },
        { id: "glutenFree", name: "Gluten-free", urlKey: "gluten free" },
        { id: "dairyFree", name: "Dairy-free", urlKey: "dairy free" },
      ],
    },
  },
  TAKEOUT_FILTER: {
    CALORIE: {
      NAME: "Calorie (kcal)",
      INITIAL_VALUE: [0, 2000],
      MIN_AND_MAX_VALUE: [0, 2000],
      STATE_KEY: "calorieValues",
    },
    FOOD_PRICE: {
      NAME: "Food price ($)",
      INITIAL_VALUE: [0, 50],
      MIN_AND_MAX_VALUE: [0, 50],
      STATE_KEY: "foodPriceValues",
    },
    DELIVERY_FEE: {
      NAME: "Delivery Time (min)",
      INITIAL_VALUE: [0, 20],
      MIN_AND_MAX_VALUE: [0, 20],
      STATE_KEY: "deliveryFeeValues",
    },
    DIET_REQUIREMENT: {
      NAME: "Diet Requirement",
      DISPLAY_NAME: "Choose a diet requirement",
      INITIAL_VALUE: "",
      STATE_KEY: "selectedRequirement",
      OPTIONS: [
        {
          id: "vegetarian",
          name: "Vegetarian",
          urlKey: "Vegetarian",
        },
        { id: "vegan", name: "Vegan", urlKey: "Vegan" },
        { id: "glutenFree", name: "Gluten-free", urlKey: "Gluten-free" },
        { id: "highProtein", name: "High Protein", urlKey: "High Protein" },
        { id: "lowCarb", name: "Low-carb", urlKey: "Low-carb option" },
      ],
    },
  },
};

export const SORT_BY = {
  INITIAL_VALUE: {
    key: "initialValue",
    name: "Sort by",
    sortBy: "",
    sortOrder: "",
  },
  RECIPE_SORT_BY: {
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
  },
  TAKEOUT_SORT_BY: {
    OPTIONS: [
      {
        key: "titleAlphabeticalOrder",
        name: "Name(A-Z)",
        sortBy: "dish_name",
        sortOrder: "asc",
      },
      {
        key: "titleReverseAlphabeticalOrder",
        name: "Name(Z-A)",
        sortBy: "dish_name",
        sortOrder: "desc",
      },
    ],
  },
};

export const FAVORITES = {
  INITIAL_VALUE: false,
};