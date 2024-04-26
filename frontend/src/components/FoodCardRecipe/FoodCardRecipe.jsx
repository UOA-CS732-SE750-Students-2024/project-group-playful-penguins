import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './FoodCardRecipe.module.css';
import { useNavigate } from "react-router-dom";

const title = "Burrito bowl with chipotle black beans";
const image = "../../public/images/bowl.png"; 
const time = "35";
const serves = "2";

export function FoodCardRecipe({data}) {
  const navigate = useNavigate();

  function openRecipeInfo(){
    console.log("clicked");
    navigate(`recipe/${data.id}`);
    
  }
  return (
    <Card className={styles.card} onClick={openRecipeInfo}>
      <CardMedia
        component="img"
        image={data.image}
        alt={data.title}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom component="div" className={styles.title}>
          {data.title}
        </Typography>
        <div className={styles.details}>
          <Typography variant="body2" color="text.secondary">
            {data.readyInMinutes} mins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Serves {data.servings}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
