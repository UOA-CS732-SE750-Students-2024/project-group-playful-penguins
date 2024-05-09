import React, { useContext, useState } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryFeeFilter } from "../Filters/DeliveryFeeFilter/DeliveryFeeFilter";
import { FoodPriceFilter } from "../Filters/FoodPriceFilter/FoodPriceFilter";
import { Box, Button, CircularProgress } from "@mui/material";
import { Favorites } from "../Favorites/Favorites";
import { LoadingButton } from "@mui/lab";
import { button_colors } from "../../constants/styles-constant";

export function FilterPanel({ onApplyFilter }) {
  const { isTakeout, resetRecipeFilters, resetTakeoutFilters } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const resetFilters = isTakeout ? resetTakeoutFilters : resetRecipeFilters;

  const handleReset = () => {
    resetFilters();
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    onApplyFilter();
  };

  return (
    <form onSubmit={handleApplyFilters}>
      <Box
        sx={{
          pt: {
            xs:"0px",
            sm:"16px"
          },
          height:"80%"
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
        <Favorites />
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
                backgroundColor: isTakeout ? button_colors.TAKE_OUT_COLOR.PRIMARY_COLOR : button_colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR,
                "&:hover": {
                  backgroundColor: isTakeout ? button_colors.TAKE_OUT_COLOR.HOVER_COLOR : button_colors.COOK_AT_HOME_COLOR.HOVER_COLOR,
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
