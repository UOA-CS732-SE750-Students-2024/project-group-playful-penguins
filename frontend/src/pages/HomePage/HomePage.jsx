import React, { useEffect } from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import {
  getMatchedRecipes,
  getMatchedTakeouts,
} from "../../services/RecipeService";
import { Typography,Button } from "@mui/material";
// import { useTheme,useMediaQuery } from "@emotion/react";
import { useTheme,useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [foodData, setFoodData] = useState(null);
  const navigate = useNavigate();
  const access_token = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  const { isTakeout, selectedSortByOption, searchTerm, filters } =
    useContext(AppContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFilterVisible, setFilterVisible] = useState(false); // initial the screen is not mobile

  const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

  const fetchFoodData = async () => {
    try {
      let response = [];
      setIsLoading(true);
      if (isTakeout) {
        response = await getMatchedTakeouts(
          searchTerm,
          selectedSortByOption,
          filters
        );
        console.log(response);
      } else {
        response = await getMatchedRecipes(
          searchTerm,
          selectedSortByOption,
          filters,
          access_token
        );
      }
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

  useEffect(() => {
    fetchFoodData();
  }, [searchTerm, selectedSortByOption, isTakeout]);

  return (
    <Box className={styles["home-container"]} sx={{
      height:"100%",
      flexDirection:{
        xs:"column",
        sm:"row",
        md:"row"
      }
    }}>
      {isMobile && (
        <Button onClick={toggleFilterVisibility} sx={{ margin: 1 }}>
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </Button>
      )}
      <Box className={styles["filter-container"]} sx={{ display: isFilterVisible || !isMobile ? 'block' : 'none' }}>
        <FilterPanel onApplyFilter={fetchFoodData} />
      </Box>
      {/* <Box className={styles["filter-container"]}>
        <FilterPanel onApplyFilter={fetchFoodData} />
      </Box> */}
      <Box className={styles["features-and-food-list-container"]}>
        <Box className={styles["search-and-sort-panel"]}>
          <Box className={styles["search-bar"]}>
            <SearchBar />
          </Box>
          <Box className={styles["sort-by"] } 
          >
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
