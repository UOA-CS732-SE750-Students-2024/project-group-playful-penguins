import React, { useContext } from "react";
import {
  Button,
  Box,
  Checkbox,
} from "@mui/material";
import { AppContext } from "../../providers/AppContextProvider";
import { button_colors } from "../../constants/styles-constant";

export function Favorites() {
  const { isTakeout, favoritesSelection, setFavoritesSelection } =
    useContext(AppContext);

  const handleClick = () => {
    setFavoritesSelection(!favoritesSelection);
  };

  return (
    <Box
      sx={{
        pr: "50px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          width: { xs: "120px", sm: "160px", md: "200px" },
          color: "white",
          backgroundColor: isTakeout ? button_colors.TAKE_OUT_COLOR.PRIMARY_COLOR : button_colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR,
          borderRadius: "15px",
          border: "1px solid #E0E0E0",
          height: { xs: "45px", md: "45px" },
          fontSize: { xs: "14px", sm: "16px" },
          textTransform: "none",
          "&:hover": {
            backgroundColor: isTakeout ? button_colors.TAKE_OUT_COLOR.HOVER_COLOR : button_colors.COOK_AT_HOME_COLOR.HOVER_COLOR,
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
