import React, { useContext, useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors, SORT_BY } from "../../constants/styles-constant";
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

  const handleSortBySelect = (selectedOption) => {
    setSelectedSortByOption(selectedOption);
    handleClose();
  };
  const sortByOptions = isTakeout
    ? SORT_BY.TAKEOUT_SORT_BY.OPTIONS
    : SORT_BY.RECIPE_SORT_BY.OPTIONS;

  return (
    <Box
      sx={{
        pt: "32px",
        pl: "16px",
        pr: "16px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding:{

          },
          width: { xs: "120px", sm: "160px",md:"200px" },
          color: "white",
          backgroundColor: isTakeout ? "#77595E" : "#00665E",
          borderRadius: "15px",
          border: "1px solid #E0E0E0",
          height: { xs: "40px", md: "65px" },
          justifyContent: "space-evenly",
          fontSize: { xs: "14px", sm: "16px" },
          textTransform: "none",
          "&:hover": {
            backgroundColor: isTakeout ? "#473538" : "#00665E",
          },
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedSortByOption.name}
      </Button>
      <Menu
        MenuListProps={{
          sx: {
            width: {
              xs: "100px",
              sm: "150px",
            },
           
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
            key={sortByOption.key}
            onClick={() => handleSortBySelect(sortByOption)}
            sx={{
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
            }}
          >
            {sortByOption.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
