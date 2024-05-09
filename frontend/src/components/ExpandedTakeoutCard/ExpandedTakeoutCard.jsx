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
import { button_colors } from "../../constants/styles-constant";

export function ExpandedTakeoutCard({ handleClose, data }) {
  return (
    <Card
      className={styles[`card`]}
      sx={{
        width: {
          xs: "280px",
          sm: "580px",
        },
        height: {
          xs: "500px",
          sm: "auto",
        },
      }}
    >
      {" "}
      <Box className={styles[`close-button`]}>
        <CloseIcon aria-label="CloseIcon" onClick={handleClose} />
      </Box>
      <CardContent
        className={styles[`card-top-content`]}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: {
            xs: "0px",
            sm: "24px",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "150px", sm: "300px" },
            height: { xs: "125px", sm: "200px" },
          }}
        >
          <CardMedia
            component="img"
            image={data.dish_image_url}
            sx={{
              height: "100%",
              width: "100%",
            }}
            alt={data.dish_name}
            className={styles[`food-image`]}
          />
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="fontWeightBold"
            className={styles[`food-title`]}
            sx={{
              fontSize: {
                xs: "16px",
                sm: "24px",
              },
              padding: {
                xs: "8px",
                sm: "16px",
              },
            }}
          >
            {data.dish_name}
          </Typography>

          <Box>
            <Box
              className={styles[`single-param`]}
              sx={{
                margin: {
                  xs: "4px",
                  sm: "10px",
                },
                gap: "4px",
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "22px",
                  },
                }}
              />
              <Typography
                varaint="body2"
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                  },
                }}
              >
                Approx delivery time {data.delivery_time} mins
              </Typography>
            </Box>
            <Box
              className={styles[`single-param`]}
              sx={{
                margin: {
                  xs: "4px",
                  sm: "10px",
                },
                gap: "2px",
              }}
            >
              <AttachMoneyTwoToneIcon
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "22px",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                  },
                }}
              >
                Approx cost per serving ${data.price}
              </Typography>
            </Box>
            <Box
              className={styles[`single-param`]}
              sx={{
                margin: {
                  xs: "4px",
                  sm: "10px",
                },
                gap: "2px",
              }}
            >
              <AttachMoneyTwoToneIcon
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "22px",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                  },
                }}
              >
                Approx delivery fee ${data.delivery_fee}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <CardContent className={styles[`card-bottom-content`]}>
        {/* <Typography variant="h6" className={styles[`card-description-title`]}>
          Description
        </Typography> */}
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "12px",
              sm: "16px",
            },
          }}
          className={styles[`card-description`]}
        >
          {data.dish_description}
        </Typography>

        <Box className={styles[`card-button`]}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: button_colors.TAKE_OUT_COLOR.PRIMARY_COLOR,
              fontSize: {
                xs: "8px",
                sm: "16px",
              },
              "&:hover": {
                backgroundColor: button_colors.TAKE_OUT_COLOR.HOVER_COLOR,
              },
            }}
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
