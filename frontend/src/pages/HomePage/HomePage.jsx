import React, { useEffect } from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import TakeoutService from "../../services/TakeoutService";
import { getMatchedRecipes } from "../../services/RecipeService";
import { Typography } from "@mui/material";
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

  const fetchFoodData = async () => {
    try {
      let response = [];
      setIsLoading(true);
      if (isTakeout) {
        // TODO: Get Takeout
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
  }, [searchTerm, selectedSortByOption]);

  return (
    <div className={styles["home-container"]}>
      <div className={styles["filter-container"]}>
        <FilterPanel onApplyFilter={fetchFoodData} />
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
        </div>
      </div>
    </div>
  );
}
