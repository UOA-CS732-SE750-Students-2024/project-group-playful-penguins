import React, { useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors, FILTERS } from "../../../constants/styles-constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function DietRequirementFilter() {
  const { isTakeout, filters, setFilters } = useContext(AppContext);

  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;

  const [anchorEl, setAnchorEl] = useState(null);
  const filterConfig = FILTERS.DIET_REQUIREMENT;
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
        minWidth: "300px",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
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
            height: "40px",
            width: "100%",
            justifyContent: "space-evenly",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#f9f9f9",
            },
          }}
          endIcon={isRequirementSelected ? null : <KeyboardArrowDownIcon />}
        >
          {filters[stateKey]}
        </Button>
        <Menu
          MenuListProps={{
            sx: {
              width: "300px",
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
              onClick={() => handleRequirementSelect(requirement.name)}
            >
              {requirement.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
