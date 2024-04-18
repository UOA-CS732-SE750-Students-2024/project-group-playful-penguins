import styles from "./RecipeInfo.module.css";
import * as React from "react";
import fontStyle from "../../assets/GlobalStyles/CustomFont.module.css";
import ClockIcon from "../../assets/SVGIconComponents/ClockIcon";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

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
              <h1 className={fontStyle["quicksand-bold"]}>Veggie Yaki Udon </h1>
              {/* Timing information */}
              <div className={styles["time-info"]}>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time 25 mins
                </h3>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time 25 mins
                </h3>
              </div>
              <div className={styles["servings-info"]}>
                <div id={styles["servings-icon"]}>
                  <ServingsIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>2 servings</h3>
              </div>
              <div className={fontStyle["quicksand-regular"]}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Facilis eum similique delectus quia minus quaerat cum quibusdam
                cupiditate. Consequatur corporis mollitia nisi similique? Maxime
                porro doloremque, voluptatum sapiente, facere velit adipisci
                ipsam optio praesentium perspiciatis, ad quo vitae nam
                reprehenderit?
              </div>
            </Box>
          </Box>
          <Box className={styles["food-type-container"]}>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Course : </strong> Dinner, Lunch
            </h3>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Cuisine : </strong> Japanese
            </h3>
            <Box
              className={`${fontStyle["quicksand-regular"]} ${styles["diet-label"]}`}
            >
              VEGAN
            </Box>
          </Box>
          <Box className={styles["section-container"]}>
            <Box className={styles["ingredients-container"]}>
              <h2 className={fontStyle["quicksand-bold"]}>Ingredients</h2>
              <Box
                className={`${fontStyle["quicksand-regular"]} ${styles["ingredients-list-container"]}`}
              >
                <List>
                  {generate(
                    <ListItem>
                      <ListItemText
                        className={`${fontStyle["quicksand-regular"]} ${styles["ingredient-item"]}`}
                        primary="Ingredient name"
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Box>
            <Box
              className={`${fontStyle["quicksand-semibold"]} ${styles["nutrients-container"]}`}
            >
              <h3>NUTRITION INFORMATION</h3>
              <Box
                className={`${fontStyle["quicksand-medium"]} ${styles["nutrients-item"]}`}
              >
                will show carbs
              </Box>
            </Box>
          </Box>
          <Box className={styles["directions-container"]}>
            <h2 className={fontStyle["quicksand-bold"]}>Directions</h2>
            <List>
                  {generate(
                    <ListItem>
                      <ListItemText
                        className={`${fontStyle["quicksand-regular"]} ${styles["ingredient-item"]}`}
                        primary="Step number"
                        // secondary="Full description of the direction"
                      />
                    </ListItem>
                  )}
                </List>
          </Box>
        </Box>
      </Box>

      {/* MUI */}
    </>
  );
}
