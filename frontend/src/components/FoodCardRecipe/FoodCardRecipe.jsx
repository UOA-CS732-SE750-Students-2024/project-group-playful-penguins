import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./FoodCardRecipe.module.css";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  updateFavRecipeID,
  removeFavRecipeID,
} from "../../services/UserService";
import { jwtDecode } from "jwt-decode";

export function FoodCardRecipe({ data, isFavorite }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);
  const access_token = JSON.parse(sessionStorage.getItem("token"));
  const email = access_token ? jwtDecode(access_token).email : '';

  function openRecipeInfo() {
    navigate(`recipe/${data.id}`);
  }

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  // Truncate title if it's longer than 60 characters
  const displayTitle = data.title
    ? data.title.length > 60
      ? `${data.title.substring(0, 40)}...`
      : data.title
    : data.title;
  const toggleFavorite = async () => {
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    try {
      if (newFavoriteStatus) {
        await updateFavRecipeID(email, data.id, access_token);
      } else {
        await removeFavRecipeID(email, data.id, access_token);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <Card className={styles.card} onClick={openRecipeInfo}>
      <CardMedia
        component="img"
        image={data.image}
        alt={data.title}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Box className={styles.cardTitle}>
          <Typography gutterBottom component="div" className={styles.title}>
            {displayTitle}
          </Typography>
        </Box>
        <div className={styles.details}>
          <AccessTimeIcon />
          <Typography variant="body2" color="text.secondary">
            {data.readyInMinutes} mins
          </Typography>
          <LocalDiningIcon />
          <Typography variant="body2" color="text.secondary">
            Serves {data.servings}
          </Typography>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite();
            }}
            className={styles.favoriteIcon}
            aria-label="add to favorites"
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
