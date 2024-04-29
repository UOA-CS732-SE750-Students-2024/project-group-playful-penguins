import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors } from "../../../constants/styles-constant";
import { StyledSlider, StyledTextField } from "../../../theme-overrides";

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
        min={0}
        max={1000}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <StyledTextField
          type="number"
          id="outlined-basic-min"
          size="small"
          value={minValue}
          onChange={handleMinChange}
          inputProps={{ readOnly: true }}
          sx={{ flex: 1, color: "black" }}
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
          inputProps={{ readOnly: true }}
          sx={{ flex: 1, color: "black" }}
        />
      </Box>
    </Box>
  );
}
