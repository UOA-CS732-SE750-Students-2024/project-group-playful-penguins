import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./FoodCardTakeout.module.css";
import axios from "axios";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

// import { getTakeouts, getTakeoutByID } from "../../services/TakeoutService";

// const title = "Garden Veggie Pita";
// const image = "../../public/images/pita.png";
// const price = "";
// const restaurant = "Pita Pat";

export function FoodCardTakeout({ data }) {
  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={data.dish_image_url}
        alt={data.dish_name}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom component="div" className={styles.title}>
          {data.dish_name}
        </Typography>
        <div className={styles.details}>
          <Typography variant="body2" color="text.secondary">
            $$ {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {data.restaurant_name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
