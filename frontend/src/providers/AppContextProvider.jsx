import React, { useState } from "react";
import { FAVORITES, SORT_BY } from "../constants/filters-constant";
import { createInitialFilterState } from "../functions/createInitialFilterState";

export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const [isTakeout, setTakeout] = useState(false);

  const [recipeFilters, setRecipeFilters] = useState(
    createInitialFilterState("RECIPE_FILTER")
  );
  const [takeoutFilters, setTakeoutFilters] = useState(
    createInitialFilterState("TAKEOUT_FILTER")
  );

  const [selectedSortByOption, setSelectedSortByOption] = useState(
    SORT_BY.INITIAL_VALUE
  );

  const [favoritesSelection, setFavoritesSelection] = useState(
    FAVORITES.INITIAL_VALUE
  );

  const [searchTerm, setSearchTerm] = useState("");

  const changeCategory = (boolean) => setTakeout(boolean);

  const resetRecipeFilters = () =>
    setRecipeFilters(createInitialFilterState("RECIPE_FILTER"));

  const resetTakeoutFilters = () =>
    setTakeoutFilters(createInitialFilterState("TAKEOUT_FILTER"));

  const context = {
    isTakeout,
    changeCategory,

    recipeFilters,
    setRecipeFilters,

    takeoutFilters,
    setTakeoutFilters,

    selectedSortByOption,
    setSelectedSortByOption,

    favoritesSelection,
    setFavoritesSelection,

    searchTerm,
    setSearchTerm,

    resetRecipeFilters,
    resetTakeoutFilters,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
