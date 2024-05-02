import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { isInputEmpty } from "../functions/isInputEmpty.js";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, email, password) {
  // Check if name, email, and password are empty
  isInputEmpty({ name, email, password });

  // Check if the password has 8 characters
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.validate();
  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
