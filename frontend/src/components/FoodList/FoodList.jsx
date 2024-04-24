import React, { useContext } from "react";
import { Grid } from '@mui/material';
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from './FoodList.module.css';

export function FoodList() {
  const { isTakeout } = useContext(AppContext);
  const cards = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className={styles.scrollableContainer}>
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {isTakeout ? <FoodCardTakeout /> : <FoodCardRecipe />}
        </Grid>
      ))}
    </Grid>
  </div>
  );
}
