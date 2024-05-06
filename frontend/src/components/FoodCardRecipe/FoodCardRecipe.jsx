import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./FoodCardRecipe.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useNavigate } from "react-router-dom";
import { Box, CardActions } from "@mui/material";

export function FoodCardRecipe({ data }) {
  const navigate = useNavigate();

  function openRecipeInfo() {
    navigate(`recipe/${data.id}`);

  }

  const [isSaved, setIsSaved] = useState(false); // Initialize isSaved state

    const toggleSaved = () => {
        setIsSaved(!isSaved); // Correctly toggle the state
    };

  // Truncate title if it's longer than 60 characters
  const displayTitle =
    data.title.length > 60 ? `${data.title.substring(0, 40)}...` : data.title;

  

  return (
    <Card className={styles.card} >
      <CardActions sx={{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"

      }}>
        <IconButton aria-label="add to favorites" onClick={toggleSaved}>
        {isSaved ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <NorthEastIcon />
        </IconButton>

      </CardActions>
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
        </div>
      </CardContent>
    </Card>
  );
}
