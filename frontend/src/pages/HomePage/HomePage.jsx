import React from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";
import { useContext, useState } from "react";
import RecipesService from "../../services/RecipeService";

export function HomePage() {

  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipeData = async () => {
    setIsLoading(true);
    try {
      const data = await RecipesService.getRecipes();
      setRecipeData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles["home-container"]}>
      <div className={styles["filter-container"]}>
        <FilterPanel />
      </div>
      <div className={styles["features-and-food-list-container"]}>
        <div className={styles["search-and-sort-panel"]}>
          <div className={styles["search-bar"]}>
            <SearchBar />
          </div>
          <div className={styles["sort-by"]}>
            <SortBy />
          </div>
        </div>
        <div className={styles["food-list"]}>
          <FoodList />
        </div>
      </div>
    </div>
  );
}
