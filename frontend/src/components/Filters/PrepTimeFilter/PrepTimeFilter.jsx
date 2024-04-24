import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function PrepTimeFilter() {
  const { prepTimeValuesFilter, setPrepTimeValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Prep Time"
      filterValue={prepTimeValuesFilter}
      setFilterValue={setPrepTimeValuesFilter}
    />
  );
}
