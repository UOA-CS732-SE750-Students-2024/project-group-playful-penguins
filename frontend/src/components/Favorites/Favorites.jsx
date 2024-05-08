import React, { useContext, useState } from "react";
import {
  Menu,
  MenuItem,
  Button,
  Typography,
  Box,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colors, FAVORITES } from "../../constants/styles-constant";
import { AppContext } from "../../providers/AppContextProvider";

export function Favorites() {
  const { isTakeout, favoritesSelection, setFavoritesSelection } =
    useContext(AppContext);

  const handleClick = () => {
    setFavoritesSelection(!favoritesSelection);
  };

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
      >
        <Checkbox
          checked={favoritesSelection}
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
          }}
        />
        Favorites
      </Button>
    </Box>
  );
}
