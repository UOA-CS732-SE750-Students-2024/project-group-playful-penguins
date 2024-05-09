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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isFilterVisible, setFilterVisible] = useState(!isMobile);

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

  const closeFilterOnMobile = () => {
    if (isFilterVisible && isMobile) {
      toggleFilterVisibility();
    }
  };

  useEffect(() => {
    fetchFoodData();
    setFilterVisible(!isMobile);
  }, [
    searchTerm,
    selectedSortByOption,
    isTakeout,
    isMobile,
    favoritesSelection,
  ]);

  return (
    <Box
      className={styles["home-container"]}
      sx={{
        height: "100%",
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
        },
      }}
    >
      {isMobile && (
        <Button
          onClick={toggleFilterVisibility}
          sx={{
            margin: 1,
            color: isTakeout ? "#77595E" : "#00665E",
            backgroundColor: "white",
            borderRadius: "15px",
            borderBottom: "3px solid #E0E0E0",
            height: "fitContent",
            fontWeight: "bold",
            justifyContent: "space-evenly",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="fontWeightBold"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
            {isFilterVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Typography>
        </Button>
      )}
      <Box
        className={styles["filter-container"]}
        sx={{
          display: isFilterVisible ? "block" : "none",
        }}
      >
        <FilterPanel
          onApplyFilter={() => {
            fetchFoodData();
            closeFilterOnMobile();
          }}
        />
      </Box>
      <Box className={styles["features-and-food-list-container"]}>
        <Box
          className={styles["search-and-sort-panel"]}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            className={styles["search-bar"]}
            sx={{
              margin: {
                xs: "0px",
                md: "0px",
              },
            }}
          >
            <SearchBar />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row",
                sm: "column",
              },
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom: {
                xs: "10px",
              },
            }}
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
