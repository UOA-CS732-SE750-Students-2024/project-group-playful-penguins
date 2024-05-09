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
      minLength: [8, "Password must be at least 8 characters long"],
    },
    favoriteRecipes: {
      type: [Number],
      default: [],
    },
    favoriteTakeouts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.statics.postGoogleCheck = async function (name, email) {
  try {
    const userInDb = await User.findOne({ email });
    if (userInDb) {
      return userInDb;
    } else {
      const user = new User({
        name,
        email,
      });
      await user.validate();
      await user.save();
      return user;
    }
    return userInDb;
  } catch (error) {
    throw new Error(error.message);
  }
};

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

userSchema.statics.login = async function (email, password) {
  // Check if name, email, and password are empty
  isInputEmpty({ email, password });

  // Check if the password has 8 characters
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  try {
    const userInDb = await User.findOne({ email });

    if (!userInDb) {
      throw new Error("Incorrect email");
    }

    // See if the password match
    const isMatch = await bcrypt.compare(password, userInDb.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    return userInDb;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
