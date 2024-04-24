import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './FoodCardRecipe.module.css';
import ClockIcon from "../../assets/SVGIconComponents/ClockIcon";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";

const title = "Burrito bowl with chipotle black beans";
const image = "../../public/images/bowl.png";
const time = "35";
const serves = "2";

export function FoodCardRecipe() {

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
            {time} mins
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Serves {serves}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
