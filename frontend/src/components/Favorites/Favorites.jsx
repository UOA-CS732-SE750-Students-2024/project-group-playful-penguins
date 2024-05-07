import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from "./Favorites.module.css";
import { displayFavoriteRecipe } from "../../services/UserService";
import { FoodList } from "../FoodList/FoodList";

export function Favorites() {
  const [value, setValue] = useState("1"); // recipe tab set by default

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [foodData, setFoodData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipeData = async () => {
    setIsLoading(true);
    try {
      const data = await displayFavoriteRecipe();
      setFoodData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };
  const fetchTakeoutData = async () => {
    setIsLoading(true);
    try {
      const data = await TakeoutService.getTakeouts();
      setFoodData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (value == "2") {
      fetchTakeoutData();
    } else {
      fetchRecipeData();
    }
  }, [value]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h4" fontWeight="fontWeightBold">
          Favorites
        </Typography>
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", paddingX: "20px" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Recipes" value="1" />
              <Tab label="Takeouts" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
         
            <div className={styles.scrollableContainer}>
              {foodData && foodData.length > 0 ? (
                <Grid
                  container
                  rowSpacing={10}
                  columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  {foodData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      
                      <FoodCardRecipe key={index} data={item} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel value="2">Takeouts</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}