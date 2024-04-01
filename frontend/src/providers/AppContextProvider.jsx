import React, { useState } from "react";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(true);
  const changeCategory = (boolean) => setTakeout(boolean);

  const context = {
    isTakeout,
    changeCategory,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
