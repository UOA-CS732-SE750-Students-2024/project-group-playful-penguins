import styles from "./RecipeInfo.module.css";

import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import { getRecipes, getRecipeByID } from "../../services/RecipeService";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import fontStyle from "../../assets/GlobalStyles/CustomFont.module.css";
import ClockIcon from "../../assets/SVGIconComponents/ClockIcon";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  styled,
  Typography,
} from "@mui/material";

const StepLabel = styled("div")({
  fontWeight: "bold",
  marginRight: "8px",
});

const DirectionText = styled("div")({});

const recipeName = "Veggie Yaki Udon";
const numServings = "2";
const prepTime = "25 mins";
const cookingTime = "20 mins";
const recipeDescription =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Facilis eum similique delectus quia minus quaerat cum quibusdamcupiditate. Consequatur corporis mollitia nisi similique? Maximeporro doloremque,voluptatum sapiente, facere velit adipisciipsam optio praesentium perspiciatis, ad quo vitae namreprehenderit?";
const courseType = ["Dinner", "Lunch"];
const cuisineType = "Japanese";
const dietRequirementLabel = "VEGAN";
const ingredientList = [
  "2 packs of udon noodles",
  "2 tablespoons sesame oil",
  "1 onion, sliced",
  "1 bell pepper, sliced",
  "1 cup mushrooms, sliced",
  "2 tablespoons soy sauce",
  "1 cup shredded cabbage",
];
const directions = [
  "Prepare the udon noodles according to the package instructions, usually boiling them in water for 3-4 minutes, then drain and set aside.",
  "Heat the sesame oil in a large pan or wok over medium-high heat.",
  "Add the sliced onion and bell pepper to the pan. Sauté for about 5 minutes or until the vegetables start to soften.",
  "Add the mushrooms to the pan and continue to cook for another 3-4 minutes, until all the vegetables are tender and nicely browned.",
  "Toss in the cooked udon noodles along with the soy sauce. Stir well to combine and ensure the noodles are well coated with the sauce.",
  "Stir in the shredded cabbage and cook for another 2 minutes, just until the cabbage is slightly wilted but still crunchy.",
  "Serve hot, garnished with sesame seeds or chopped green onions if desired.",
];

const nutritionInfo = [
  { type: "Calories Content", amount: `100 kcal` },
  { type: "Protein Content", amount: `12.5g` },
  { type: "Carbohydrates Content", amount: `11.4g` },
  { type: "Total Fat Content", amount: `1.3g` },
];

export default function RecipeInfo() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipe = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRecipeByID(id);
      setRecipe(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, []);

  // the data being fetched from API needs to be processed
  function removeTags(text) {
    let cleanText = text.replace(/<b>|<\/b>|<a href="[^"]*">|<\/a>/g, "");
    return cleanText;
  }

  return (
    <>
      {recipe ? (
        <Box className={styles["top-container"]}>
          <Box className={styles["info-container"]}>
            {/* Recipe name, photo information */}
            <Box className={styles["details-container"]}>
              <Box className={styles["recipe-photo-container"]}>
                <img className={styles["recipe-photo"]} src={recipe.image} />
              </Box>
              <Box className={styles["basic-info"]}>
                <Typography variant="h4" fontWeight="fontWeightBold">
                  {recipe.title }
                </Typography>
                {/* Timing information */}
                <Box className={styles["time-info"]}>
                  <Box id={styles["clock-icon"]}>
                    <ClockIcon />
                  </Box>
                  <Typography variant="h6" fontWeight="fontWeightMedium">
                    Total time taken : {recipe.readyInMinutes} mins
                  </Typography>
                </Box>
                {/* Servings information */}
                <Box className={styles["servings-info"]}>
                  <Box id={styles["servings-icon"]}>
                    <ServingsIcon />
                  </Box>
                  <Typography variant="h6" fontWeight="fontWeightMedium">
                    {" "}
                    {recipe.servings} Servings
                  </Typography>
                </Box>
                {/* Recipe detailed description */}
                <Typography variant="body1" fontWeight="fontWeightMedium">
                  {" "}
                  {removeTags(recipe.summary)}
                </Typography>
              </Box>
            </Box>
            {/* Cuisine, dietary requirement information */}
            <Box className={styles["food-type-container"]}>
              <Typography variant="h6" fontWeight="fontWeightRegular">
                <strong>Dish Type: </strong>
                {recipe && recipe.dishTypes && recipe.dishTypes.length > 0
                  ? recipe.dishTypes.join(", ")
                  : "No dish types available"}
              </Typography>
              <Typography variant="h6" fontWeight="fontWeightRegular">
                {recipe.cuisines &&
                  recipe.cuisines.length > 0 &&
                  (<strong>Cuisine : </strong>)` ${recipe.cuisines.join(", ")}`}
              </Typography>
              <Box className={styles["diet-label"]}>
                <Typography>{recipe.diets[0]}</Typography>
              </Box>
            </Box>
            {/* Ingredients and Nutrition information */}
            <Box className={styles["section-container"]}>
              <Box className={styles["ingredients-container"]}>
                <Typography variant="h5" fontWeight="fontWeightBold">
                  Ingredients
                </Typography>
                <Box className={` ${styles["ingredients-list-container"]}`}>
                  <List>
                    {recipe.extendedIngredients.map((ingredient, index) => (
                      <ListItem
                        key={index}
                        className={styles["ingredient-item"]}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              • {ingredient.original}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box className={` ${styles["nutrients-container"]}`}>
                <Typography variant="h6" fontWeight="fontWeightBold">
                  NUTRITION INFORMATION
                </Typography>
                {nutritionInfo.map((nutrient, index) => (
                  <Box
                    key={index}
                    className={`${fontStyle["quicksand-medium"]} ${styles["nutrients-item"]}`}
                  >
                    {`${nutrient.type}:   ${nutrient.amount}`}
                  </Box>
                ))}
              </Box>
            </Box>
            {/* Directions of the recipe */}
            <Box className={styles["directions-container"]}>
              <Typography
                variant="h5"
                fontWeight="fontWeightBold"
                className={` ${styles["green-font"]}`}
              >
                Directions
              </Typography>
              <Grid container spacing={2}>
                {recipe.analyzedInstructions[0].steps.map(
                  (direction, index) => (
                    <Grid
                      key={index}
                      container
                      item
                      xs={12}
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid
                        item
                        className={`${styles["direction-step-item"]}  ${styles["green-font"]}`}
                      >
                        <StepLabel>
                          <Typography
                            variant="h6"
                            fontWeight="fontWeightMedium"
                            className={` ${styles["green-font"]}`}
                          >
                            {`Step ${index + 1}`}
                          </Typography>
                        </StepLabel>
                      </Grid>
                      <Grid item xs className={` ${styles["direction-item"]}`}>
                        <DirectionText>
                          <Typography
                            variant="h6"
                            fontWeight="fontWeightMedium"
                          >
                            {direction.step}
                          </Typography>
                        </DirectionText>
                      </Grid>
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      ) : (
        "Loading recipe..."
      )}
    </>
  );
}
