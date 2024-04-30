import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./FoodCardTakeout.module.css";
import { ExpandedTakeoutCard } from "../../components/ExpandedTakeoutCard/ExpandedTakeoutCard";
import { useState } from "react";
import { Box } from "@mui/material";
import Zoom from "@mui/material/Zoom";

export function FoodCardTakeout({ data }) {
  const [openTakeoutCard, setOpenTakeoutCard] = useState(false);

  const handleOpen = () => {
    setOpenTakeoutCard(true);
  };
  const handleClose = () => {
    setOpenTakeoutCard(false);
  };

  return (
    <Box>
      <Card onClick={handleOpen} className={styles.card}>
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
      <Modal
        className={styles[`modal-container`]}
        open={openTakeoutCard}
        onClose={handleClose}
      >
        <Zoom in={openTakeoutCard}>
          <Box>
            <ExpandedTakeoutCard handleClose={handleClose} />
          </Box>
        </Zoom>
      </Modal>
    </Box>
  );
}
