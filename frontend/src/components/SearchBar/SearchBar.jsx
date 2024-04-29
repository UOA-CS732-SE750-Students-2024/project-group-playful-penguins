import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "../../providers/AppContextProvider";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  const { isTakeout, searchTerm, setSearchTerm } = useContext(AppContext);
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setSearchTerm]
  );

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
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        ref={inputEl}
        variant="outlined"
        placeholder="Search for recipes"
        fullWidth
        he
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
          sx: {
            height: "65px",
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
