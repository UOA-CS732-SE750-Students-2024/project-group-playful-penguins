import User from "../model/userModel.js";

export const getFavoritesQuery = async (isRecipe, email, isFavorites) => {
  try {
    let user;
    isFavorites = (isFavorites === "true");
    if (isFavorites) {
      if (isRecipe) {
        user = await User.findOne({ email }, { favoriteRecipes: 1 });
        if (user) return { id: { $in: user.favoriteRecipes } };
      } else {
        user = await User.findOne({ email }, { favoriteTakeouts: 1 });
        if (user) return { id: { $in: user.favoriteTakeouts } };
      }
    } else return {};
  } catch (error) {
    console.error("Server error: ", error);
  }
};
