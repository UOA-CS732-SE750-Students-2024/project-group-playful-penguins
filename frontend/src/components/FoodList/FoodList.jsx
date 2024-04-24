import React, { useContext } from "react";
import { Grid } from '@mui/material';
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../providers/AppContextProvider";
import styles from './FoodList.module.css';


export function FoodList({foodData}) {
  const { isTakeout } = useContext(AppContext);return (
    <div className={styles.scrollableContainer}>
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
      {foodData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {isTakeout ? <FoodCardTakeout key={index} data={item}/> : <FoodCardRecipe key={index} data={item}/>}
        </Grid>
      ))}
    </Grid>
  </div>
  );
}
