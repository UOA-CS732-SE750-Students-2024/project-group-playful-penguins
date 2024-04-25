import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './FoodCardTakeout.module.css';

const title = "Garden Veggie Pita";
const image = "../../public/images/pita.png"; 
const price = "";
const restaurant = "Pita Pat";

export function FoodCardTakeout() {

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom component="div" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.details}>
          <Typography variant="body2" color="text.secondary">
            $$ {price} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {restaurant}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
