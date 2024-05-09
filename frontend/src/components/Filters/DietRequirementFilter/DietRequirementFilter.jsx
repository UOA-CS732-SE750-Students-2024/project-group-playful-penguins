import React, { useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors } from "../../../constants/styles-constant";
import { FILTERS } from "../../../constants/filters-constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function DietRequirementFilter() {
  const {
    isTakeout,
    recipeFilters,
    setRecipeFilters,
    takeoutFilters,
    setTakeoutFilters,
  } = useContext(AppContext);

  const [filters, setFilters] = isTakeout
    ? [takeoutFilters, setTakeoutFilters]
    : [recipeFilters, setRecipeFilters];
  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;

  const [anchorEl, setAnchorEl] = useState(null);

  const filterConfig = isTakeout
    ? FILTERS.TAKEOUT_FILTER.DIET_REQUIREMENT
    : FILTERS.RECIPE_FILTER.DIET_REQUIREMENT;

  const stateKey = filterConfig.STATE_KEY;

  const isRequirementSelected =
    filters[stateKey] !== filterConfig.INITIAL_VALUE;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequirementSelect = (requirement) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [stateKey]: requirement,
    }));
    handleClose();
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: "auto",
        width: {
          xs: "200px",
          md: "250px",
        },
        maxWidth: "300px",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          fontSize: {
            xs: "16px",
            md: "22px",
          },
        }}
        color={primaryColor}
      >
        {filterConfig.NAME}
      </Typography>
      <Box>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            color: isRequirementSelected ? "black" : "#878787",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
            boxShadow: "none",
            textTransform: "none",
            height: "fit-content",
            width: "100%",
            justifyContent: "space-evenly",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#f9f9f9",
            },
          }}
          endIcon={isRequirementSelected ? null : <KeyboardArrowDownIcon />}
        >
          {/* Since we are not storing the name of the diet requirement, so we need to use the filters (from app 
              context), to retrieve the name of the selected diet requirement. */}
          {filters[stateKey] !== filterConfig.INITIAL_VALUE
            ? filterConfig.OPTIONS.find(
                (option) => option.urlKey === filters[stateKey]
              )?.name
            : filterConfig.DISPLAY_NAME}
        </Button>
        <Menu
          MenuListProps={{
            sx: {
              width: { xs: "160px", md: "300px" },
            },
          }}
          id="diet-requirement-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {filterConfig.OPTIONS.map((requirement) => (
            <MenuItem
              key={requirement.id}
              onClick={() => handleRequirementSelect(requirement.urlKey)}
            >
              {requirement.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
