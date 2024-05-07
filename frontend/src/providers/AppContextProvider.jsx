import React, { useState } from "react";
import { FILTERS, SORT_BY } from "../constants/styles-constant";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(false);
  const [filters, setFilters] = useState({
    calorieValues: FILTERS.CALORIE.INITIAL_VALUE,
    carbohydrateValues: FILTERS.CARBOHYDRATE.INITIAL_VALUE,
    cookingTimeValues: FILTERS.COOKING_TIME.INITIAL_VALUE,
    priceValues: FILTERS.PRICE.INITIAL_VALUE,
    deliveryTimeValues: FILTERS.DELIVERY_TIME.INITIAL_VALUE,
    selectedRequirement: FILTERS.DIET_REQUIREMENT.INITIAL_VALUE,
  });

  const [selectedSortByOption, setSelectedSortByOption] = useState(
    SORT_BY.INITIAL_VALUE
  );

  const [searchTerm, setSearchTerm] = useState("");

  const changeCategory = (boolean) => setTakeout(boolean);

  const context = {
    isTakeout,
    changeCategory,

    filters,
    setFilters,

    selectedSortByOption,
    setSelectedSortByOption,

    searchTerm,
    setSearchTerm,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
