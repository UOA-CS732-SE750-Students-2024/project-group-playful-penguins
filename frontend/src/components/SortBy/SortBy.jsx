import React, { useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors } from "../../constants/styles-constant";
import { AppContext } from "../../providers/AppContextProvider";

export function SortBy() {
  const { isTakeout, selectedSortByOption, setSelectedSortByOption } =
    useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBySelect = (requirement) => {
    setSelectedSortByOption(requirement);
    handleClose();
  };
  const sortByOptions = [
    { id: "Name(A-Z)", name: "Name(A-Z)" },
    { id: "Name(Z-A)", name: "Name(Z-A)" },
  ];

  return (
    <Box
      sx={{
        pt: "32px",
        pl: "16px",
        pr: "32px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          width: "150px",
          color: "white",
          backgroundColor: isTakeout ? "#77595E" : "#00665E",
          borderRadius: "15px",
          border: "1px solid #E0E0E0",
          height: "65px",
          justifyContent: "space-evenly",
          fontSize: "16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: isTakeout ? "#473538" : "#00665E",
          },
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedSortByOption}
      </Button>
      <Menu
        MenuListProps={{
          sx: {
            width: "150px",
          },
        }}
        id="sort-by-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortByOptions.map((sortByOption) => (
          <MenuItem
            key={sortByOption.id}
            onClick={() => handleSortBySelect(sortByOption.name)}
          >
            {sortByOption.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
