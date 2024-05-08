import React, { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryFeeFilter } from "../Filters/DeliveryFeeFilter/DeliveryFeeFilter";
import { FoodPriceFilter } from "../Filters/FoodPriceFilter/FoodPriceFilter";
import { Box, Button, CircularProgress } from "@mui/material";
import { colors, FILTERS } from "../../constants/styles-constant";
import { LoadingButton } from "@mui/lab";
// import { getFilteredRecipes } from "../../services/RecipeService";

export function FilterPanel({ onApplyFilter }) {
  const { isTakeout, resetRecipeFilters, resetTakeoutFilters } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const resetFilters = isTakeout ? resetTakeoutFilters : resetRecipeFilters;

  const handleReset = () => {
    resetFilters();
    onApplyFilter();
  };
  const handleApplyFilters = (event) => {
    event.preventDefault();
    onApplyFilter();
  };

  return (
    <form onSubmit={handleApplyFilters}>
      <Box
        sx={{
          pt: "16px",
        }}
      >
        <CalorieCountFilter />
        {isTakeout ? (
          <div>
            <FoodPriceFilter />
            <DeliveryFeeFilter />
          </div>
        ) : (
          <div>
            <PrepTimeFilter />
            <CookingTimeFilter />
          </div>
        )}
        <DietRequirementFilter />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: "16px",
            pr: "16px",
            pt: "8px",
            margin: "auto",
          }}
        >
          {isLoading ? (
            <LoadingButton
              loading={isLoading}
              size="large"
              sx={{
                flex: 1,
                borderRadius: "15px",
                marginRight: "8px",
                backgroundColor: "transparent",
                border: isTakeout ? "2px solid #EDB1BB" : "2px solid #00CCBB",
                "& .MuiCircularProgress-colorPrimary": {
                  color: isTakeout ? "#EDB1BB" : "#00CCBB",
                },
              }}
              loadingIndicator={<CircularProgress size={24} />} // Custom circular progress indicator
            />
          ) : (
            <Button
              type="submit"
              variant="text"
              size="large"
              sx={{
                flex: 1,
                color: "white",
                borderRadius: "15px",
                backgroundColor: isTakeout ? "#EDB1BB" : "#00CCBB",
                "&:hover": {
                  backgroundColor: isTakeout ? "#473538" : "#00665E",
                },
                marginRight: "8px",
              }}
            >
              Apply
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="text"
            size="large"
            sx={{
              flex: 1,
              color: "black",
              borderRadius: "15px",
              backgroundColor: "#D9D9D9",
              "&:hover": {
                backgroundColor: "darkgray",
                borderColor: "darkgray",
              },
              marginLeft: "8px",
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </form>
  );
}
