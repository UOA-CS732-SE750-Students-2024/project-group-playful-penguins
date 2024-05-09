import mongoose from "mongoose";

const TakeoutSchema = mongoose.Schema({
  id: String,
  dish_name: String,
  dish_description: String,
  calories: Number,
  dietary_requirement: String,
  dish_image_url: String,
  price: Number,
  restaurant_name: String,
  restaurant_web_url: String,
  location: String,
  delivery_time: Number,
  delivery_fee: Number,
  cuisine_type: String,
  healthiness_category: String,
});

TakeoutSchema.statics.search = async function (query, sortCriteria) {
  try {
    const matchRecipes = await Takeout.find(query).sort(sortCriteria);
    if (matchRecipes.length > 0) {
      return matchRecipes;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
const Takeout = mongoose.model("Takeout", TakeoutSchema);

export default Takeout;
