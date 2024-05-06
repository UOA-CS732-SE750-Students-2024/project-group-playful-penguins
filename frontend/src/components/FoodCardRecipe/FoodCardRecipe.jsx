import React, { useState } from "react";
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

export function FoodCardRecipe({ data }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  function openRecipeInfo() {
    navigate(`recipe/${data.id}`);
  }

  // Truncate title if it's longer than 60 characters
  const displayTitle = data.title.length > 60 ? `${data.title.substring(0, 40)}...` : data.title;
  const toggleFavorite = () => {
    setFavorite(!favorite);
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
          <AccessTimeIcon/>
          <Typography variant="body2" color="text.secondary">
            {data.readyInMinutes} mins
          </Typography>
          <LocalDiningIcon/>
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
