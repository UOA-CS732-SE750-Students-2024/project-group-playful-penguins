import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function CalorieCountFilter() {
  const { calorieCountValuesFilter, setCalorieCountValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Calorie Count"
      filterValue={calorieCountValuesFilter}
      setFilterValue={setCalorieCountValuesFilter}
    />
  );
}
