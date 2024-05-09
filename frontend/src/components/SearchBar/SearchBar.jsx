import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  const { isTakeout, setSearchTerm, searchTerm } = useContext(AppContext);

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
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        variant="outlined"
        placeholder={isTakeout ? "Search for dishes" : "Search for recipes"}
        fullWidth
        he
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
          sx: {
            height: { xs: "40px", sm: "60px" },
            width: "100%",
            fontSize: { xs: "14px", md: "20px" },
            borderRadius: "15px",
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
