import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  const { isTakeout } = useContext(AppContext);

  return (
    <Box
      sx={{
        pt: "32px",
        pl: "16px",
        pr: "16px",
        pb: "16px",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search for recipes"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
          style: {
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            backgroundColor: isTakeout ? "#FDF7F8" : "#E6FAF8",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
      />
    </Box>
  );
}
