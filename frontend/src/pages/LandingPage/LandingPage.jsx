import styles from "./LandingPage.module.css";
import UserIcon from "../../assets/SVGIconComponents/UserIcon";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LandingPage() {
  const theme = useTheme();
  const { changeCategory } = useContext(AppContext);
  const navigate = useNavigate();

  function openCookPage() {
    changeCategory(false);
    navigate(`/home`);
  }

  function openTakeoutPage() {
    changeCategory(true);
    navigate(`/home`);
  }

  return (
    <>
      <Box className={styles["top-container"]}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "50vh",
            width: "100%",
          }}
        >
          <Box className={styles.topbar}>
            <Box
              sx={{
                width: {
                  xs: "60px", // Width for extra small screens
                  md: "60px", // Width for medium screens
                  lg: "80px", // Width for large screens
                },
                height: {
                  xs: "60px", // Height for extra small screens
                  md: "60px", // Height for medium screens
                  lg: "80px", // Height for large screens
                },
              }}
            >
              <img
                id={styles["logo-icon"]}
                src="/images/app-logo.png"
                width="100%"
                height="100%"
                alt="logo for playful penguins"
              />
            </Box>

            <Box id={styles["user-icon"]}>
              <AccountCircleIcon />
            </Box>
          </Box>

          <Box className={styles["slogan-container"]}>
            <Typography
              variant="h3"
              fontWeight="fontWeightRegular"
              className={` ${styles["slogan-first-line"]}`}
              sx={{
                fontSize: {
                  xs: "18px", // for small screens
                  sm: "24px", // for medium screens
                  md: "30px", // for larger screens
                },
              }}
            >
              Can't decide what to eat? no worries
            </Typography>

            <Typography
              variant="h2"
              fontWeight="fontWeightBold"
              className={` ${styles["slogan-second-line"]}`}
              sx={{
                fontWeight: "bold",
                fontSize: {
                  xs: "24px", // for small screens
                  sm: "30px", // for medium screens
                  md: "48px", // for larger screens
                },
              }}
            >
              PLAYFUL PENGUINS GOT YOU COVERED
            </Typography>
          </Box>
        </Box>

        <Box
          className={styles["CTAs-container"]}
          sx={{
            justifyContent: {
              xs: "end",
              sm: "space-between",
              md: "space-between",
              lg: "space-between",
            },
            height: {
              xs: "50vh",
              sm: "50vh",
              md: "50vh",
              lg: "50vh",
            },

            marginTop: {
              // xs: "50px", fif you want this margin then remove the margin below
              // sm: "70px", or sm:"0px"
              // md: "80px",
              // lg: "85px",
            },

            flexDirection: {
              xs: "column",
              sm: "row",
              md: "row",
              lg: "row",
            },
          }}
        >
          <Box
            className={`${styles["CTA"]} ${styles["CTA-takeout"]}`}
            sx={{
              gap: {
                xs: "10px",
                sm: "5px",
                md: "10px",
                lg: "40px",
              },
              padding: {
                xs: "1rem",
                sm: "1.5rem",
                md: "2rem",
                lg: "4rem",
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="fontWeightMedium"
              sx={{
                fontSize: {
                  xs: "12px", // for small screens
                  sm: "18px",
                  md: "20px", // for medium screens
                  lg: "24px", // for larger screens
                },
              }}
            >
              Don't feel like cooking, we got you&nbsp;
              <strong>
                many healthy takeout options to choose from your loved brands
              </strong>
            </Typography>
            <Button
              onClick={openTakeoutPage}
              id={`${styles["CTA-button-takeout"]}`}
              sx={{
                borderRadius: "16px",
                padding: {
                  xs: "1rem 2rem",
                  md: "2rem 4rem",
                  lg: "3rem 6rem",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "none",
                  fontSize: {
                    xs: "18px", // for small screens
                    md: "24px", // for medium screens
                    lg: "32px", // for larger screens
                  },
                }}
              >
                Takeout
              </Typography>
            </Button>
          </Box>
          <Box
            className={`${styles["CTA"]} ${styles["CTA-cook"]}`}
            sx={{
              padding: {
                xs: "1rem",
                sm: "1.5rem",
                md: "2rem",
                lg: "4rem",
              },
              gap: {
                xs: "10px",
                sm: "5px",
                md: "10px",
                lg: "40px",
              },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="fontWeightMedium"
              sx={{
                fontSize: {
                  xs: "12px", // for small screens
                  sm: "18px",
                  md: "20px", // for medium screens
                  lg: "24px", // for larger screens
                },
              }}
            >
              You got <strong>some saute skills,</strong>&nbsp; playful penguins
              got you a<strong> range of recipes</strong> to put your skills to
              test !
            </Typography>

            <Button
              onClick={openCookPage}
              id={`${styles["CTA-button-cook"]}`}
              sx={{
                borderRadius: "16px",
                padding: {
                  xs: "1rem 2rem",
                  md: "2rem 4rem",
                  lg: "3rem 6rem",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "none",
                  fontSize: {
                    xs: "18px", // for small screens
                    md: "24px", // for medium screens
                    lg: "32px", // for larger screens
                  },
                }}
              >
                Cook at home
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
