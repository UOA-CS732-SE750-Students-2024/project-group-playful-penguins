import React, { useState } from "react";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(true);
  const changeCategory = (boolean) => setTakeout(boolean);

  const [calorieCountValuesFilter, setCalorieCountValuesFilter] = useState([
    0, 100,
  ]);

  const context = {
    isTakeout,
    changeCategory,
    calorieCountValuesFilter,
    setCalorieCountValuesFilter,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
