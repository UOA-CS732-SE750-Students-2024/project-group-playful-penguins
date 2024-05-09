import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from "./FoodList.module.css";
import { getFavoriteIds } from "../../services/UserService";
import { jwtDecode } from "jwt-decode";

export function FoodList({ foodData }) {
  const { isTakeout } = useContext(AppContext);
  const access_token = JSON.parse(sessionStorage.getItem("token"));
  const email = access_token ? jwtDecode(access_token).email : '';
  const [favoriteTakeouts, setFavoriteTakeouts] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, [email, access_token]);

  const loadFavorites = async () => {
    try {
      const response = await getFavoriteIds(email, access_token);
      if (response && response.favIds) {
        setFavoriteRecipes(response.favIds.recipes);
        setFavoriteTakeouts(response.favIds.takeouts);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className={styles.scrollableContainer}>
      {foodData && foodData.length > 0 ? (
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {foodData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {isTakeout ? (
                <FoodCardTakeout
                  key={index}
                  data={item}
                  isFavorite={favoriteTakeouts.includes(item.id)}
                />
              ) : (
                <FoodCardRecipe
                  key={index}
                  data={item}
                  isFavorite={favoriteRecipes.includes(item.id)}
                />
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
