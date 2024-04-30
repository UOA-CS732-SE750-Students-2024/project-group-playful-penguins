import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  id: Number,
  title: String,
  servings: String,
  readyInMinutes: Number,
  image: String,
  dishTypes: String,
  diets: {
    type: [String],
  },
  summary: String,
  cuisines: String,
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
  calories: Number,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
