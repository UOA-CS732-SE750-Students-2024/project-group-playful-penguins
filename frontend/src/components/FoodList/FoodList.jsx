import React, { useContext } from "react";
import { Grid } from '@mui/material';
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../providers/AppContextProvider";
import styles from './FoodList.module.css';


export function FoodList({foodData}) {
  const { isTakeout } = useContext(AppContext);
  const cards = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className={styles.scrollableContainer}>
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {isTakeout ? <FoodCardTakeout /> : <FoodCardRecipe />}
        </Grid>
      ))}
    </Grid>
      /*
  const navigate = useNavigate();

  function navigateToRecipeInfo(){
    console.log("clicked a card")
    navigate('/recipe');


  }

  return (<div>
    {foodData && foodData.length > 0 ? (
      foodData.map((item, index) => (
        isTakeout ? (
          <FoodCardTakeout key={index} data={item} />
        ) : (
          <FoodCardRecipe key={index} data={item} />
        )
      ))
    ) : (
      <p>No data available.</p>  
    )}*/
  </div>
  );
}
