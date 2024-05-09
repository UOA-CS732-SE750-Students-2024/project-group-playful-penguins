import React, { useContext } from "react";
import {
  Button,
  Box,
  Checkbox,
} from "@mui/material";
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
          width: { xs: "120px", sm: "160px", md: "200px" },
          color: "white",
          backgroundColor: isTakeout ? "#77595E" : "#00665E",
          borderRadius: "15px",
          border: "1px solid #E0E0E0",
          height: { xs: "40px", md: "65px" },
          fontSize: { xs: "14px", sm: "16px" },
          justifyContent: "space-evenly",
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
