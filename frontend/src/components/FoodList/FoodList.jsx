import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from "./FoodList.module.css";
import {getFavRecipeID, getFavTakeoutID} from "../../services/UserService";

export function FoodList({ foodData }) {
  const { isTakeout } = useContext(AppContext);
  const access_token = JSON.parse(localStorage.getItem("token"));
  const email = localStorage.getItem('userEmail')
  const [favoriteTakeouts, setFavoriteTakeouts] = useState([]);
  const [favoriteRecipes, setFavoriteRceipes] = useState([]);


  useEffect(() => {
    loadFavoriteRecipes();
}, [email, access_token]); 

useEffect(() => {
  loadFavoriteTakeout();
}, [email, access_token]); 

  const loadFavoriteRecipes = async () => {
    try{
      const response = await getFavRecipeID(email, access_token);
      setFavoriteRceipes(response);
    }catch (error) {
      throw new Error(error.message);
    } 
  }

  console.log(favoriteTakeouts)

  const loadFavoriteTakeout = async () => {
    try{
      const response = await getFavTakeoutID(email, access_token);
      setFavoriteTakeouts(response);
    }catch (error) {
      throw new Error(error.message);
    } 
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
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}
