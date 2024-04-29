import React, { useState } from "react";
import { FILTERS } from "../constants/styles-constant";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(false);
  const [filters, setFilters] = useState({
    calorieCountValues: FILTERS.CALORIE_COUNT.INITIAL_VALUE,
    prepTimeValues: FILTERS.PREP_TIME.INITIAL_VALUE,
    cookingTimeValues: FILTERS.COOKING_TIME.INITIAL_VALUE,
    priceValues: FILTERS.PRICE.INITIAL_VALUE,
    deliveryTimeValues: FILTERS.DELIVERY_TIME.INITIAL_VALUE,
    selectedRequirement: "Choose a diet requirement",
  });

  const [selectedSortByOption, setSelectedSortByOption] = useState("Sort By");
  const [isRequirementSelected, setIsRequirementSelected] = useState(false);

  const changeCategory = (boolean) => setTakeout(boolean);

  const context = {
    isTakeout,
    changeCategory,
    filters,
    setFilters,
    selectedSortByOption,
    setSelectedSortByOption,
    isRequirementSelected,
    setIsRequirementSelected,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
