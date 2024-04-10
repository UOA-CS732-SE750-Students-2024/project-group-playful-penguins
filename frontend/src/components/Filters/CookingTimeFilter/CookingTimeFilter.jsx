import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function CookingTimeFilter() {
  const { deliveryTimeValuesFilter, setDeliveryTimeValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Cooking Time"
      filterValue={deliveryTimeValuesFilter}
      setFilterValue={setDeliveryTimeValuesFilter}
    />
  );
}
