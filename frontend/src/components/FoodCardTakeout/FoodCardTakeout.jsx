import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./FoodCardTakeout.module.css";
import { ExpandedTakeoutCard } from "../../components/ExpandedTakeoutCard/ExpandedTakeoutCard";
import { Box } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function FoodCardTakeout({ data }) {
  const [openTakeoutCard, setOpenTakeoutCard] = useState(false);

  const [takeoutData, setTakeoutData] = useState({});

  const handleOpen = (id) => {
    fetchTakeoutData(id);
    setOpenTakeoutCard(true);
  };
  const handleClose = () => {
    setOpenTakeoutCard(false);
  };

  const fetchTakeoutData = async (id) => {
    try {
      const response = await axios.get(BACKEND_URL + `/takeouts/${id}`);

      if (!response.data) {
        throw new Error("No data from backend");
      }
      setTakeoutData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Box>
      <Card onClick={() => handleOpen(data.id)} className={styles.card}>
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
            <ExpandedTakeoutCard handleClose={handleClose} data={takeoutData} />
          </Box>
        </Zoom>
      </Modal>
    </Box>
  );
}
