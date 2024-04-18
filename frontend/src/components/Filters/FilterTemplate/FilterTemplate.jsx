import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../providers/AppContextProvider";
import colors from "../../../constants/styles-constant";

const StyledSlider = styled(Slider)(
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

const StyledTextField = styled(TextField)(({ theme }) => ({
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

export function FilterTemplate({ filterName, filterValue, setFilterValue }) {
  const { isTakeout } = useContext(AppContext);

  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;
  const secondaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.SECONDARY_COLOR
    : colors.COOK_AT_HOME_COLOR.SECONDARY_COLOR;

  const [minValue, setMinValue] = useState(filterValue[0]);
  const [maxValue, setMaxValue] = useState(filterValue[1]);

  const handleSliderChange = (event, newValue) => {
    setFilterValue(newValue);
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
  };

  const handleMinChange = (event) => {
    const newMin = Number(event.target.value);
    setMinValue(newMin);
    if (newMin <= maxValue) {
      setFilterValue([newMin, maxValue]);
    }
  };

  const handleMaxChange = (event) => {
    const newMax = Number(event.target.value);
    setMaxValue(newMax);
    if (newMax >= minValue) {
      setFilterValue([minValue, newMax]);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: "auto",
        maxWidth: 500,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        color={primaryColor}
      >
        {filterName}
      </Typography>
      <StyledSlider
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        value={filterValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0} // Set a minimum value for the slider
        max={100} // Set a maximum value for the slider
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <StyledTextField
          type="number"
          id="outlined-basic-min"
          size="small"
          value={minValue}
          onChange={handleMinChange}
          inputProps={{ readOnly: true }} // Make TextField read-only
          sx={{ flex: 1 }} // Allow the text field to grow
        />
        <Typography variant="h6" component="span" sx={{ alignSelf: "center" }}>
          —
        </Typography>
        <StyledTextField
          type="number"
          id="outlined-basic-max"
          size="small"
          value={maxValue}
          onChange={handleMaxChange}
          sx={{ flex: 1 }} // Allow the text field to grow
          inputProps={{ readOnly: true }} // Make TextField read-only
        />
      </Box>
    </Box>
  );
}
