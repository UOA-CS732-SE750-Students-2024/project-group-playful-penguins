import styles from "./RecipeInfo.module.css";
import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { getRecipes, getRecipeByID } from "../../services/RecipeService";
import LinearProgress from "@mui/material/LinearProgress";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  styled,
  Typography,
  Button,
} from "@mui/material";

const StepLabel = styled("div")({
  fontWeight: "bold",
  marginRight: "8px",
});

const DirectionText = styled("div")({});

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, []);

  // the data being fetched from backend needs to be processed before displaying
  function removeTags(text) {
    let cleanText = text.replace(/<b>|<\/b>|<a href="[^"]*">|<\/a>/g, "");
    return cleanText;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          width: "200px",
          marginTop: "50px",
        }}
      >
        <Button
          component={Link}
          to="/home"
          sx={{
            color: "black",
            padding: "10px 20px",
          }}
        >
          <ArrowBackIcon></ArrowBackIcon>
          <Typography variant="h6" fontWeight="fontWeightMedium">
            Back
          </Typography>
        </Button>
      </Box>
      <Box className={styles["top-container"]}>
        {!isLoading && recipe ? (
          <Box
            className={styles["info-container"]}
            sx={{
              marginRight: {
                // sm:"25px",
                // md: "50px",
                // lg: "96px",
              },
              marginLeft: {
                // sm:"25px",
                // md: "50px",
                // lg: "96px",
              },
            }}
          >
            {/* Recipe name, photo information */}
            <Box
              className={styles["details-container"]}
              sx={{
                flexDirection: {
                  xs:"column", // less than 600px
                  sm:"column", // less than 900px
                  md: "column",
                  lg: "column", // changing this to row breaks everything!!
                },
                gap:{
                  xs:"0px", // less than 600px
                  sm:"0px", // less than 900px
                  md: "80px",
                  lg: "80px",

                }
              }}
            >
              <Box className={styles["recipe-photo-container"]} sx={{
                width:{
                  xs:"195px", // less than 600px
                  sm:"195px", // less than 900px
                  md:"390px",
                  lg:"390px",
                  // md: "500px",
                  // lg: "390px",
                },
                height:{
                  xs:"168px", // less than 600px
                  sm:"168px", // less than 900px
                  md: "337px",
                  lg: "337px",
                },
              }}>
                <img className={styles["recipe-photo"]} src={recipe.image} />
              </Box>
              <Box className={styles["basic-info"]}>
                <Typography variant="h4" fontWeight="fontWeightBold">
                  {recipe.title}
                </Typography>
                {/* Timing information */}
                <Box className={styles["time-info"]}>
                  <Box id={styles["clock-icon"]}>
                    <AccessTimeIcon />
                  </Box>
                  <Typography variant="h6" fontWeight="fontWeightMedium">
                    Total time taken : {recipe.readyInMinutes} mins
                  </Typography>
                </Box>
                {/* Servings information */}
                <Box className={styles["servings-info"]}>
                  <Box id={styles["servings-icon"]}>
                    <LocalDiningIcon />
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
                  : "Stay tuned for dish types !"}
              </Typography>
              <Typography variant="h6" fontWeight="fontWeightRegular">
                <strong>Cuisine Type: </strong>
                {recipe && recipe.cuisines && recipe.cuisines.length > 0
                  ? recipe.cuisines.join(", ")
                  : "Stay tuned for cuisine details !"}
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
                  <Box key={index} className={` ${styles["nutrients-item"]}`}>
                    <Typography
                      variant="h6"
                      fontWeight="fontWeightMedium"
                    >{`${nutrient.type}:   ${nutrient.amount}`}</Typography>
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
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: "10px",
            }}
          >
            <Typography variant="h5">
              Hang in there while we grab that recipe for you!
            </Typography>
            <LinearProgress
              sx={{
                width: "80%",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#003d38",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
