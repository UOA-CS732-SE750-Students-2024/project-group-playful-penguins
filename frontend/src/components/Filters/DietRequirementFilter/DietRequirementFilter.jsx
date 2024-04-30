import React, { Children, useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors } from "../../../constants/styles-constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function DietRequirementFilter() {
  const {
    isTakeout,
    selectedRequirement,
    setSelectedRequirement,
    isRequirementSelected,
    setIsRequirementSelected,
  } = useContext(AppContext);
  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequirementSelect = (requirement) => {
    setSelectedRequirement(requirement);
    console.log(isRequirementSelected); // This should log the updated state.
    setIsRequirementSelected(true);
    console.log(isRequirementSelected); // This should log the updated state.
    handleClose();
  };

  const dietRequirements = [
    { id: "vegan", name: "Vegan" },
    { id: "glutenFree", name: "Gluten-free" },
    { id: "lactoseIntolerance", name: "Lactose intolerance" },
    { id: "glutenIntolerance", name: "Gluten intolerance" },
  ];

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
        Diet requirement
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
          {selectedRequirement}
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
          {dietRequirements.map((requirement) => (
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
