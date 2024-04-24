import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { CalorieCountFilter } from "../Filters/CalorieCountFilter/CalorieCountFilter";
import { PrepTimeFilter } from "../Filters/PrepTimeFilter/PrepTimeFilter";
import { DietRequirementFilter } from "../Filters/DietRequirementFilter/DietRequirementFilter";
import { CookingTimeFilter } from "../Filters/CookingTimeFilter/CookingTimeFilter";
import { DeliveryTimeFilter } from "../Filters/DeliveryTimeFilter/DeliveryTimeFilter";
import { PriceFilter } from "../Filters/PriceFilter/PriceFilter";
import { Box, Button } from "@mui/material";

export function FilterPanel() {
  const { isTakeout } = useContext(AppContext);

  return (
    <div>
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
            backgroundColor: "#7575DE",
            "&:hover": {
              backgroundColor: "#B22222",
            },
            marginRight: "8px",
          }}
        >
          Apply
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{
            flex: 1,
            color: "black", // TODO change color dynamically
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
    </div>
  );
}
