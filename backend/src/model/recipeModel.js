import mongoose, { Schema } from "mongoose";

const RecipeSchema = mongoose.Schema({
  id: Number,
  title: String,
  servings: String,
  readyInMinutes: Number,
  image: String,
  dishTypes: {
    type: [String],
  },
  cuisines: {
    type: [String],
  },
  diets: {
    type: [String],
  },
  summary: String,
  cuisines: {
    type: [String],
  },
  extendedIngredients: {
    id: Number,
    aisle: String,
    image: String,
    consistency: String,
    name: String,
    nameClean: String,
    original: String,
    originalName: String,
    amount: Number,
    unit: String,
  },
  analyzedInstructions: {
    name: String,
    steps: {
      number: Number,
      step: String,
    },
  },
  nutrition: {
    type: Schema.Types.Mixed,
    default: {},
  },
  calories: Number,
});

RecipeSchema.statics.search = async function (query, sortCriteria) {
  try {
    const matchRecipes = await Recipe.find(query).sort(sortCriteria);
    if (matchRecipes.length > 0) {
      return matchRecipes;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
