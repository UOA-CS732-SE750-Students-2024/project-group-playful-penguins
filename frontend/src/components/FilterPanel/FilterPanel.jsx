import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryTimeFilter } from "../Filters/DeliveryTimeFilter/DeliveryTimeFilter";
import { PriceFilter } from "../Filters/PriceFilter/PriceFilter";
import { Box, Button } from "@mui/material";
import { colors } from "../../constants/styles-constant";

export function FilterPanel() {
  const { isTakeout } = useContext(AppContext);
  const {
    setCalorieCountValuesFilter,
    setPrepTimeValuesFilter,
    setCookingTimeValuesFilter,
    setPriceValuesFilter,
    setDeliveryTimeValuesFilter,
    setSelectedRequirement,
    setSelectedSortByOption,
    setIsRequirementSelected,
  } = useContext(AppContext);

  const handleReset = () => {
    // Reset all filters to their initial values
    setCalorieCountValuesFilter([20, 50]);
    setPrepTimeValuesFilter([20, 50]);
    setCookingTimeValuesFilter([20, 50]);
    setPriceValuesFilter([20, 50]);
    setDeliveryTimeValuesFilter([20, 50]);
    setSelectedRequirement("Choose a diet requirement");
    setSelectedSortByOption("Sort By");
    setIsRequirementSelected(false);
  };

  return (
    <Box
      sx={{
        pt: "16px",
      }}
    >
      <CalorieCountFilter />
      {isTakeout ? (
        <div>
          <PriceFilter />
          <DeliveryTimeFilter />
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
        <Button
          variant="text"
          size="large"
          sx={{
            flex: 1, // TODO change color dynamically
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
  );
}
