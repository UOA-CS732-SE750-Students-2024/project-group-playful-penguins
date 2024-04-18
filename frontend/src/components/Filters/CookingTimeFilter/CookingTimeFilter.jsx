import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function CookingTimeFilter() {
  const { cookingTimeValuesFilter, setCookingTimeValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Cooking Time"
      filterValue={cookingTimeValuesFilter}
      setFilterValue={setCookingTimeValuesFilter}
    />
  );
}
