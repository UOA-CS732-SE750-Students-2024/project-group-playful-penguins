import React, { useEffect } from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { Favorites } from "../../components/Favorites/Favorites";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import {
  getMatchedRecipes,
  getMatchedTakeouts,
} from "../../services/RecipeService";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { getMatchedRecipes } from "../../services/RecipeService";
import { getMatchedTakeouts } from "../../services/TakeoutService";

export function HomePage() {
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();
  const access_token = JSON.parse(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  const {
    isTakeout,
    selectedSortByOption,
    searchTerm,
    favoritesSelection,
    takeoutFilters,
    recipeFilters,
  } = useContext(AppContext);

  const fetchFoodData = async () => {
    try {
      let response = [];
      setIsLoading(true);
      if (isTakeout) {
        response = await getMatchedTakeouts(
          searchTerm,
          selectedSortByOption,
          takeoutFilters,
          favoritesSelection,
          access_token
        );
      } else {
        response = await getMatchedRecipes(
          searchTerm,
          selectedSortByOption,
          recipeFilters,
          favoritesSelection,
          access_token
        );
      }
      console.log(response);

      if (response) {
        if (response.status === 401) {
          navigate("/login");
        } else {
          if (response.length > 0) {
            setFoodData(response);
          } else if (response.length === 0) {
            setFoodData([]);
          }
        }
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFilterVisible, setFliterVisible] = useState(isMobile); // keep an eye 

  const toggleFilterVisibility = () => {
    setFliterVisible(!isFilterVisible);
  };

  useEffect(() => {
    fetchFoodData();
  }, [searchTerm, selectedSortByOption, isTakeout, favoritesSelection]);

  return (
    <Box className={styles["home-container"]}>
      {isMobile && (
        <Button
          onClick={toggleFilterVisibility}
          sx={{
            margin: 1,
          }}
        >
          {isFilterVisible ? "Hide Filter" : "Show Filters"}
        </Button>
      )}
      <Box
        className={styles["filter-container"]}
        sx={{
          display: isFilterVisible ? "block" : "none",
        }} // keep an eye
      >
        <FilterPanel onApplyFilter={fetchFoodData} />
      </Box>
      <Box className={styles["features-and-food-list-container"]}>
        <Box className={styles["search-and-sort-panel"]}>
          <Box className={styles["search-bar"]}>
            <SearchBar />
          </ Box>
          <div className={styles["favorites"]}>
            <Favorites />
          </div>
          <Box className={styles["sort-by"]}>
          </Box>
          <Box className={styles["sort-by"]}>
            <SortBy />
          </Box>
        </Box>
        <Box className={styles["food-list"]}>
          {isLoading ? (
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
          ) : (
            <FoodList foodData={foodData} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
