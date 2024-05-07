import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { FoodCardRecipe } from "../FoodCardRecipe/FoodCardRecipe";
import { FoodCardTakeout } from "../FoodCardTakeout/FoodCardTakeout";
import { AppContext } from "../../providers/AppContextProvider";
import styles from "./FoodList.module.css";

export function FoodList({ foodData, favoriteIDs }) {
  const { isTakeout } = useContext(AppContext);
  let favoriteids = [657679,
    664419,
    659143,
    664737,
    664090]
  //const user = User.findOne({ email: 'ikin666@env.nz' });
  //console.log(user)

  return (
    <div className={styles.scrollableContainer}>
      {foodData && foodData.length > 0 ? (
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {foodData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {isTakeout ? (
                <FoodCardTakeout key={index} data={item} isFavorite={true} />
              ) : (
                <FoodCardRecipe key={index} data={item} isFavorite={favoriteIDs.includes(item.id)} itemId = {item.id}/>
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
