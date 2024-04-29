import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryTimeFilter } from "../Filters/DeliveryTimeFilter/DeliveryTimeFilter";
import { PriceFilter } from "../Filters/PriceFilter/PriceFilter";
import { Box, Button } from "@mui/material";
import { colors, FILTERS } from "../../constants/styles-constant";

export function FilterPanel() {
  const { isTakeout, setFilters } = useContext(AppContext);

  const handleReset = () => {
    // Create a new object to hold the reset filters
    const resetFilters = {};

    // Iterate over the keys in FILTERS
    Object.keys(FILTERS).forEach((key) => {
      // Assign the initial value from FILTERS to the corresponding state key
      resetFilters[FILTERS[key].STATE_KEY] = FILTERS[key].INITIAL_VALUE;
    });

    setFilters(resetFilters);
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
