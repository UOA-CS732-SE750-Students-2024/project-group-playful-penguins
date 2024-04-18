import { Slider, styled } from "@mui/material";

export const StyledSlider = styled(Slider)(
  ({ theme, primaryColor, secondaryColor }) => ({
    color: primaryColor,
    height: 8,
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: `2px solid ${primaryColor}`,
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: `0px 0px 0px 8px ${primaryColor}`,
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-track": {
      height: 8,
      borderRadius: 4,
      background: primaryColor,
    },
    "& .MuiSlider-rail": {
      color: secondaryColor,
      opacity: 1,
      height: 8,
      borderRadius: 4,
    },
  })
);
