import React from "react";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SortBy } from "../../components/SortBy/SortBy";
import { FoodList } from "../../components/FoodList/FoodList";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.home_container}>
      <div className={styles.container_one}>
        <FilterPanel />
      </div>
      <div className={styles.container_two}>
        <div className={styles.feature_container}>
          <div className={styles.search_bar}>
            <SearchBar />
          </div>
          <div className={styles.sort_by}>
            <SortBy />
          </div>
        </div>
        <div className={styles.food_list}>
          <FoodList />
        </div>
      </div>
    </div>
  );
}
