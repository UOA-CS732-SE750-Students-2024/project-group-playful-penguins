import styles from "./RecipeInfo.module.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
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
  return (
    
    <>{/* Top-level container */}
      <Box className={styles["top-container"]}>
        <Box className={styles["info-container"]}>
          {/* Recipe name, photo information */}
          <Box className={styles["details-container"]}>
            <Box
              className={styles["recipe-photo-container"]}
              src="/images/Yaki-Udon.jpg"
            >
              <img
                className={styles["recipe-photo"]}
                src="/images/Yaki-Udon.jpg"
              />
            </Box>
            <Box className={styles["basic-info"]}>
             
              <Typography variant="h4" fontWeight="fontWeightBold">
                {/* {recipeName} */}{id}
              </Typography>
              {/* Timing information */}
              <Box className={styles["time-info"]}>
                <Box id={styles["clock-icon"]}>
                  <ClockIcon />
                </Box>
                <Typography variant="h6" fontWeight="fontWeightMedium">
                  Prep time {prepTime}
                </Typography>
                <Box id={styles["clock-icon"]}>
                  <ClockIcon />
                </Box>
                <Typography variant="h6" fontWeight="fontWeightMedium">
                  Cook time {cookingTime}
                </Typography>
              </Box>
              {/* Servings information */}
              <Box className={styles["servings-info"]}>
                <Box id={styles["servings-icon"]}>
                  <ServingsIcon />
                </Box>
                <Typography variant="h6" fontWeight="fontWeightMedium">
                  {" "}
                  {numServings} Servings
                </Typography>
              </Box>
              {/* Recipe detailed description */}
              <Typography variant="body1" fontWeight="fontWeightMedium">
                {" "}
                {recipeDescription}
              </Typography>
            </Box>
          </Box>
          {/* Cuisine, dietary requirement information */}
          <Box className={styles["food-type-container"]}>
            <Typography variant="h6" fontWeight="fontWeightRegular">
              <strong>Course : </strong> {`${courseType[0]}, ${courseType[1]}`}
            </Typography>
            <Typography variant="h6" fontWeight="fontWeightRegular">
              <strong>Cuisine : </strong> {cuisineType}
            </Typography>
            <Box className={styles["diet-label"]}>
              <Typography>{dietRequirementLabel}</Typography>
            </Box>
          </Box>
          {/* Ingredients and Nutrition information */}
          <Box className={styles["section-container"]}>
            <Box className={styles["ingredients-container"]}>
              <Typography variant="h5" fontWeight="fontWeightBold">
                Ingredients
              </Typography>
              <Box
                className={`${fontStyle["quicksand-regular"]} ${styles["ingredients-list-container"]}`}
              >
                <List>
                  {ingredientList.map((ingredient, index) => (
                    <ListItem key={index} className={styles["ingredient-item"]}>
                      <ListItemText
                        primary={
                          <Typography variant="h6">• {ingredient}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Box
              className={`${fontStyle["quicksand-semibold"]} ${styles["nutrients-container"]}`}
            >
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
              {directions.map((text, index) => (
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
                  <Grid
                    item
                    xs
                    className={`${fontStyle["quicksand-bold"]} ${styles["direction-item"]}`}
                  >
                    <DirectionText>
                      <Typography variant="h6" fontWeight="fontWeightMedium">
                        {text}
                      </Typography>
                    </DirectionText>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
