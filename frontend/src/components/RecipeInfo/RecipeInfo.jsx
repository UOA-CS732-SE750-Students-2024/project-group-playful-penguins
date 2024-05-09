import styles from "./RecipeInfo.module.css";
import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { getRecipeByID } from "../../services/RecipeService";
import LinearProgress from "@mui/material/LinearProgress";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  styled,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const StepLabel = styled("div")({
  fontWeight: "bold",
  marginRight: "8px",
});

const DirectionText = styled("div")({});

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
      <Box
        className={styles["top-container"]}
        sx={{
          mx: {
            xs: "42px",
            sm: "82px",
            md: "82px",
            lg: "165px",
          },
        }}
      >
        {!isLoading && recipe ? (
          <Box
            className={styles["info-container"]}
            sx={{
              mx: {
                xs: "12px",
                sm: "24px",
                md: "48px",
                lg: "96px",
              },
            }}
          >
            {/* Recipe name, photo information */}
            <Box
              className={styles["details-container"]}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                },
              }}
            >
              <Box className={styles["recipe-photo-container"]}>
                <CardMedia
                  component="img"
                  className={styles["recipe-photo"]}
                  src={recipe.image}
                  sx={{
                    height: {
                      xs: "120px",
                      sm: "200px",
                      md: "200px",
                      lg: "337px",
                    },
                    width: {
                      xs: "180px",
                      sm: "250px",
                      md: "350px",
                      lg: "390px",
                    },
                  }}
                />
              </Box>
              <Box className={styles["basic-info"]}>
                <Typography
                  variant="h4"
                  fontWeight="fontWeightBold"
                  sx={{
                    fontSize: {
                      xs: "22px",
                      md: "28px",
                    },
                  }}
                >
                  {recipe.title}
                </Typography>
                {/* Timing information */}
                <Box className={styles["time-info"]}>
                  <Box id={styles["clock-icon"]}>
                    <AccessTimeIcon />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="fontWeightMedium"
                    sx={{
                      fontSize: {
                        xs: "16px",
                      },
                    }}
                  >
                    Total time taken : {recipe.readyInMinutes} mins
                  </Typography>
                </Box>
                {/* Servings information */}
                <Box className={styles["servings-info"]}>
                  <Box id={styles["servings-icon"]}>
                    <LocalDiningIcon />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="fontWeightMedium"
                    sx={{
                      fontSize: {
                        xs: "16px",
                      },
                    }}
                  >
                    {" "}
                    {recipe.servings} Servings
                  </Typography>
                </Box>
                {/* Recipe detailed description */}
                <Typography
                  variant="body1"
                  fontWeight="fontWeightMedium"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "14px",
                    },
                  }}
                >
                  {" "}
                  {removeTags(recipe.summary)}
                </Typography>
              </Box>
            </Box>
            {/* Cuisine, dietary requirement information */}
            <Box
              className={styles["food-type-container"]}
              sx={{
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                gap: {
                  xs: "10px",
                  md: "5px",
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="fontWeightRegular"
                sx={{
                  fontSize: {
                    xs: "16px",
                    md: "20px",
                  },
                }}
              >
                <strong>Dish Type: </strong>

                {recipe && recipe.dishTypes && recipe.dishTypes.length > 0
                  ? recipe.dishTypes.join(", ")
                  : "Stay tuned for dish types !"}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="fontWeightRegular"
                sx={{
                  fontSize: {
                    xs: "16px",
                    md: "20px",
                  },
                }}
              >
                <strong>Cuisine Type: </strong>

                {recipe.cuisines && recipe.cuisines.length > 0
                  ? recipe.cuisines.join(", ")
                  : "Stay tuned for cuisine details !"}
                {}
              </Typography>

              <Box
                className={styles["diet-label"]}
                sx={{
                  height: "fitContent",
                }}
              >
                <Typography>{recipe.diets[0]}</Typography>
              </Box>
            </Box>
            {/* Ingredients and Nutrition information */}
            <Box
              className={styles["section-container"]}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                alignItems: {
                  xs: "center",
                  md: "self-start",
                },

                gap: {
                  xs: "50px",
                  md: "20px",
                },
              }}
            >
              <Box className={styles["ingredients-container"]}>
                <Typography
                  variant="h5"
                  fontWeight="fontWeightBold"
                  sx={{
                    fontSize: {
                      xs: "16px",
                      md: "24px",
                    },
                  }}
                >
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
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: {
                                  xs: "12px",
                                  md: "18px",
                                },
                              }}
                            >
                              • {ingredient.original}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box
                className={` ${styles["nutrients-container"]}`}
                sx={{
                  padding: {
                    xs: "16px",
                    md: "32px",
                  },
                  gap: {
                    xs: "5px",
                    md: "10px",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="fontWeightBold"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      md: "24px",
                    },
                  }}
                >
                  NUTRITION INFORMATION
                </Typography>

                {recipe.nutrition.nutrients
                  .slice(0, 10)
                  .map((nutrient, index) => (
                    <Box key={index} className={` ${styles["nutrients-item"]}`}>
                      <Typography
                        variant="h6"
                        fontWeight="fontWeightMedium"
                        sx={{
                          fontSize: {
                            xs: "12px",
                            md: "18px",
                          },
                        }}
                      >{`${nutrient.name}:   ${nutrient.amount}  ${nutrient.unit}`}</Typography>
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
                sx={{
                  fontSize: {
                    xs: "16px",
                    md: "24px",
                  },
                }}
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
                            sx={{
                              fontSize: {
                                xs: "12px",
                                md: "18px",
                              },
                            }}
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
                            sx={{
                              fontSize: {
                                xs: "12px",
                                md: "18px",
                              },
                            }}
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
