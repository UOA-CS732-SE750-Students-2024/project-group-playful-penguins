import React, { useEffect } from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import TakeoutService from "../../services/TakeoutService";
import { getRecipes } from '../../services/RecipeService';

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function HomePage() {
  const [foodData, setFoodData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { isTakeout } = useContext(AppContext);

  const fetchRecipeData = async () => {
    setIsLoading(true);
    try {
      const data = await getRecipes();
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
      const data = await TakeoutService.getRecipes();
      setFoodData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isTakeout) {
      fetchTakeoutData();
    } else {
      fetchRecipeData();
    }
  }, []);

  return (
    <div className={styles["home-container"]}>
      <div className={styles["filter-container"]}>
        <FilterPanel />
      </div>
      <div className={styles["features-and-food-list-container"]}>
        <div className={styles["search-and-sort-panel"]}>
          <div className={styles["search-bar"]}>
            <SearchBar />
          </div>
          <div className={styles["sort-by"]}>
            <SortBy />
          </div>
        </div>
        <div className={styles["food-list"]}>
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <LinearProgress sx={{ width: "80%" }} />
            </Box>
          ) : (
            <FoodList foodData={foodData} />
          )}
        </div>
      </div>
    </div>
  );
}
