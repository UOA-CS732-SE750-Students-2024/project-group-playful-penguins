import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 15,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    "&.Mui-focused": {
      boxShadow: theme.shadows[3],
    },
    "& fieldset": {
      borderWidth: "0 !important",
    },
    "& input": {
      textAlign: "center",
    },
  },
}));
