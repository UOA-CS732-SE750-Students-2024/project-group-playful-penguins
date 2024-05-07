import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from "./FoodList.module.css";
import { jwtDecode } from "jwt-decode";

export function FoodList({ foodData }) {
  const { isTakeout } = useContext(AppContext);
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  let { favoriteRecipes, favoriteTakeouts } = decoded;

  if(!favoriteRecipes){
    favoriteRecipes=[]
  }

  if(!favoriteTakeouts){
    favoriteTakeouts=[]
  }

  return (
    <div className={styles.scrollableContainer}>
      {foodData && foodData.length > 0 ? (
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {foodData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {isTakeout ? (
                <FoodCardTakeout key={index} data={item} isFavorite={favoriteTakeouts.includes(item.id)} />
              ) : (
                <FoodCardRecipe key={index} data={item} isFavorite={favoriteRecipes.includes(item.id)}/>
              )
              }
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
