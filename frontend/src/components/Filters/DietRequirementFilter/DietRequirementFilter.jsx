import React, { useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors } from "../../../constants/styles-constant";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function DietRequirementFilter() {
  const { isTakeout } = useContext(AppContext);
  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRequirement, setSelectedRequirement] = useState(
    "Choose a diet requirement"
  );
  const [isItemSelected, setIsItemSelected] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequirementSelect = (requirement) => {
    setSelectedRequirement(requirement);
    setIsItemSelected(false);
    handleClose();
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: "auto",
        maxWidth: 500,
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
            color: isItemSelected ? "#878787" : "black",
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
          endIcon={isItemSelected ? <KeyboardArrowDownIcon /> : null}
        >
          {selectedRequirement}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleRequirementSelect("Vegan")}>
            Vegan
          </MenuItem>
          <MenuItem onClick={() => handleRequirementSelect("Gluten-free")}>
            Gluten-free
          </MenuItem>
          <MenuItem
            onClick={() => handleRequirementSelect("Lactose intolerance")}
          >
            Lactose intolerance
          </MenuItem>
          <MenuItem
            onClick={() => handleRequirementSelect("Gluten intolerance")}
          >
            Gluten intolerance
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
