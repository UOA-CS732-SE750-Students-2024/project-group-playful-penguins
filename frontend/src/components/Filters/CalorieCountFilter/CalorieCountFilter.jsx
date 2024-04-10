import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function CalorieCountFilter() {
  const { calorieCountValuesFilter, setCalorieCountValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterValue={calorieCountValuesFilter}
      setFilterValue={setCalorieCountValuesFilter}
    />
  );
}
