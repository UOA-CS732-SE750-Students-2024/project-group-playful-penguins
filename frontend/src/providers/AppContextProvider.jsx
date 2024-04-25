import React, { useState } from "react";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(false);
  const changeCategory = (boolean) => setTakeout(boolean);
  const [calorieCountValuesFilter, setCalorieCountValuesFilter] = useState([
    20, 50,
  ]);
  const [prepTimeValuesFilter, setPrepTimeValuesFilter] = useState([20, 50]);
  const [cookingTimeValuesFilter, setCookingTimeValuesFilter] = useState([
    20, 50,
  ]);
  const [priceValuesFilter, setPriceValuesFilter] = useState([20, 50]);
  const [deliveryTimeValuesFilter, setDeliveryTimeValuesFilter] = useState([
    20, 50,
  ]);
  const [selectedRequirement, setSelectedRequirement] = useState(
    "Choose a diet requirement"
  );
  const [selectedSortByOption, setSelectedSortByOption] = useState("Sort By");
  const [isRequirementSelected, setIsRequirementSelected] = useState(false);

  const context = {
    isTakeout,
    changeCategory,
    calorieCountValuesFilter,
    setCalorieCountValuesFilter,
    prepTimeValuesFilter,
    setPrepTimeValuesFilter,
    cookingTimeValuesFilter,
    setCookingTimeValuesFilter,
    priceValuesFilter,
    setPriceValuesFilter,
    deliveryTimeValuesFilter,
    setDeliveryTimeValuesFilter,
    selectedRequirement,
    setSelectedRequirement,
    selectedSortByOption,
    setSelectedSortByOption,
    isRequirementSelected,
    setIsRequirementSelected,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
