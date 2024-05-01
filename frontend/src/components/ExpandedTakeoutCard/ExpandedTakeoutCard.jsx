import styles from "./ExpandedTakeoutCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
export function ExpandedTakeoutCard({ handleClose, data }) {
  return (
    <Card className={styles[`card`]}>
      <CardContent className={styles[`card-top-content`]}>
        <Box>
          <CardMedia
            component="img"
            image={data.dish_image_url}
            alt={data.dish_name}
            className={styles[`food-image`]}
          />
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h2"
            className={styles[`food-title`]}
          >
            {data.dish_name}
          </Typography>

          <Box>
            <Box className={styles[`single-param`]}>
              <AccessTimeIcon />
              <Typography variant="body2">
                Approx delivery time {data.delivery_time} mins
              </Typography>
            </Box>
            <Box className={styles[`single-param`]}>
              <AttachMoneyTwoToneIcon />
              <Typography variant="body2">
                Approx cost per serving ${data.price}
              </Typography>
            </Box>
            <Box className={styles[`single-param`]}>
              <AttachMoneyTwoToneIcon />
              <Typography variant="body2">
                Approx delivery fee ${data.delivery_fee}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles[`close-button`]}>
          <CloseIcon onClick={handleClose} />
        </Box>
      </CardContent>

      <CardContent className={styles[`card-bottom-content`]}>
        <Typography variant="h6" className={styles[`card-description-title`]}>
          Description
        </Typography>
        <Typography variant="body1" className={styles[`card-description`]}>
          {data.dish_description}
        </Typography>

        <Box className={styles[`card-button`]}>
          <Button
            variant="contained"
            onClick={() =>
              window.open(`${data.restaurant_web_url}`, "_blank", "noopener")
            }
          >
            Order From {data.restaurant_name} Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
