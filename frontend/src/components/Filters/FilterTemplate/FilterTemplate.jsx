import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../../providers/AppContextProvider";
import { colors } from "../../../constants/styles-constant";
import { FILTERS } from "../../../constants/filters-constant";
import { StyledSlider, StyledTextField } from "../../../theme-overrides";

export function FilterTemplate({ filterKey }) {
  const {
    isTakeout,
    recipeFilters,
    setRecipeFilters,
    takeoutFilters,
    setTakeoutFilters,
  } = useContext(AppContext);

  const [filters, setFilters] = isTakeout
    ? [takeoutFilters, setTakeoutFilters]
    : [recipeFilters, setRecipeFilters];

  const primaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.PRIMARY_COLOR
    : colors.COOK_AT_HOME_COLOR.PRIMARY_COLOR;
  const secondaryColor = isTakeout
    ? colors.TAKE_OUT_COLOR.SECONDARY_COLOR
    : colors.COOK_AT_HOME_COLOR.SECONDARY_COLOR;

  const filterConfig = isTakeout
    ? FILTERS.TAKEOUT_FILTER[filterKey]
    : FILTERS.RECIPE_FILTER[filterKey];
  const stateKey = filterConfig.STATE_KEY;

  const [minValue, setMinValue] = useState(filters[stateKey][0]);
  const [maxValue, setMaxValue] = useState(filters[stateKey][1]);

  const handleSliderChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [stateKey]: newValue,
    }));
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
  };

  const handleMinChange = (event) => {
    const newMin = Number(event.target.value);
    setMinValue(newMin);
    if (newMin <= maxValue) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [stateKey]: [newMin, maxValue],
      }));
    }
  };

  const handleMaxChange = (event) => {
    const newMax = Number(event.target.value);
    setMaxValue(newMax);
    if (newMax >= minValue) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [stateKey]: [minValue, newMax],
      }));
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: "auto",
        width:{
          xs:"200px",
          // sm:"200px",
          md:"200px"
        },
        height:{
          xs:"100px"
          // xs:"60%"
        }
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          xs:"16px",
          md:"22px"
        }}
        color={primaryColor}
      >
        {filterConfig.NAME}
      </Typography>
      <StyledSlider
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        value={filters[stateKey]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={filterConfig.MIN_AND_MAX_VALUE[0]}
        max={filterConfig.MIN_AND_MAX_VALUE[1]}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <StyledTextField
          type="number"
          id="outlined-basic-min"
          size="small"
          value={minValue}
          onChange={handleMinChange}
          inputProps={{ readOnly: true }}
          sx={{ flex: 1, color: "black" ,'&input':{
            fontSize:{
              xs:"12px",
              sm:'14px',
              md:"16px",
            }
          }}}
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
          sx={{ flex: 1, color: "black",'&input':{
            fontSize:{
              xs:"12px",
              sm:'14px',
              md:"16px",
            }
          } }}
        />
      </Box>
    </Box>
  );
}
