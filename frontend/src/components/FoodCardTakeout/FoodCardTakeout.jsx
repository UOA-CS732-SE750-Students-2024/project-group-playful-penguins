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

const title = "Garden Veggie Pita";
const image = "../../public/images/pita.png";
const price = "";
const restaurant = "Pita Pat";

export function FoodCardTakeout() {
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
