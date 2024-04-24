import React, { useContext } from "react";
import { FilterTemplate } from "../FilterTemplate/FilterTemplate";
import { AppContext } from "../../../providers/AppContextProvider";

export function DeliveryTimeFilter() {
  const { deliveryTimeValuesFilter, setDeliveryTimeValuesFilter } =
    useContext(AppContext);
  return (
    <FilterTemplate
      filterName="Delivery Time"
      filterValue={deliveryTimeValuesFilter}
      setFilterValue={setDeliveryTimeValuesFilter}
    />
  );
}
