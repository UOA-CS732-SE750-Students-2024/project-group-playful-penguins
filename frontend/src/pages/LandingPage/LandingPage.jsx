import styles from "./LandingPage.module.css";
import UserIcon from "../../assets/SVGIconComponents/UserIcon";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate("/login");
    }
  })

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
            <Link href="/">
              <Box
                sx={{
                  width: {
                    xs: "60px",
                    md: "60px",
                    lg: "80px",
                  },
                  height: {
                    xs: "60px",
                    md: "60px",
                    lg: "80px",
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
              </Box>{" "}
            </Link>
          </Box>

          <Box className={styles["slogan-container"]}>
            <Typography
              variant="h3"
              fontWeight="fontWeightRegular"
              className={` ${styles["slogan-first-line"]}`}
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "24px",
                  md: "30px",
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
                  xs: "24px",
                  sm: "30px",
                  md: "48px",
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
                  xs: "12px",
                  sm: "18px",
                  md: "20px",
                  lg: "24px",
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
                    xs: "18px",
                    md: "24px",
                    lg: "32px",
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
                  xs: "12px",
                  sm: "18px",
                  md: "20px",
                  lg: "24px",
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
                    xs: "18px",
                    md: "24px",
                    lg: "32px",
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
