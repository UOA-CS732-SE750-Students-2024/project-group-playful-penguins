import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function PriceFilter() {
  const { priceValuesFilter, setPriceValuesFilter } = useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Price"
      filterValue={priceValuesFilter}
      setFilterValue={setPriceValuesFilter}
    />
  );
}
