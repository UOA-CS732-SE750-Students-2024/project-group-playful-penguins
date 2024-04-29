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
});

const Takeout = mongoose.model("Takeout", TakeoutSchema);

export default Takeout;
