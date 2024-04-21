import styles from "./RecipeInfo.module.css";
import * as React from "react";
import fontStyle from "../../assets/GlobalStyles/CustomFont.module.css";
import ClockIcon from "../../assets/SVGIconComponents/ClockIcon";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Grid, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
}));

const StepNumber = styled(ListItemText)(({ theme }) => ({
  minWidth: "50px",
  fontWeight: "bold",
  marginRight: theme.spacing(2), // space between step number and text
}));

const StepContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(1, 0), // Apply vertical padding
}));


const StepLabel = styled('div')({
  fontWeight: 'bold',
  marginRight: '8px', // Adjust spacing as needed
});

const DirectionText = styled('div')({});



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
  return (
    <>
      <Box className={styles["box"]}>
        <Box className={styles["info-container"]}>
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
              {/* {Recipe name} */}
              <h1 className={fontStyle["quicksand-bold"]}>{recipeName}</h1>
              {/* Timing information */}
              <div className={styles["time-info"]}>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time {prepTime}
                </h3>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time {cookingTime}
                </h3>
              </div>
              <div className={styles["servings-info"]}>
                <div id={styles["servings-icon"]}>
                  <ServingsIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  {numServings} Servings
                </h3>
              </div>
              <div className={fontStyle["quicksand-regular"]}>
                {recipeDescription}
              </div>
            </Box>
          </Box>
          <Box className={styles["food-type-container"]}>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Course : </strong> {`${courseType[0]}, ${courseType[1]}`}
            </h3>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Cuisine : </strong> {cuisineType}
            </h3>
            <Box
              className={`${fontStyle["quicksand-regular"]} ${styles["diet-label"]}`}
            >
              {dietRequirementLabel}
            </Box>
          </Box>
          <Box className={styles["section-container"]}>
            <Box className={styles["ingredients-container"]}>
              <h2 className={fontStyle["quicksand-bold"]}>Ingredients</h2>
              <Box
                className={`${fontStyle["quicksand-regular"]} ${styles["ingredients-list-container"]}`}
              >
                <List>
                  {ingredientList.map((ingredient, index) => (
                    <ListItem key={index} className={styles["ingredient-item"]}>
                      <ListItemText
                        primary={
                          <Typography variant="body1">
                            • {ingredient}
                          </Typography>
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
              <h3>NUTRITION INFORMATION</h3>
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
          <Box className={styles["directions-container"]}>
            <h2 className={`${fontStyle["quicksand-bold"]} ${styles["green-font"]}`}>Directions</h2>

            {/* {EXPERIMENTING with grid } */}
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
                  <Grid item className={`${fontStyle["quicksand-bold"]} ${styles["direction-step-item"]}  ${styles["green-font"]}`}>
                    <StepLabel>{`Step ${index + 1}`}</StepLabel>
                  </Grid>
                  <Grid item xs className={`${fontStyle["quicksand-bold"]} ${styles["direction-item"]}` }>
                    <DirectionText>{text}</DirectionText>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* MUI */}
    </>
  );
}
