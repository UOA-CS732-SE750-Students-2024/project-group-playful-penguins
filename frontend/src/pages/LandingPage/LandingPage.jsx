import styles from "./LandingPage.module.css";
import UserIcon from "../../assets/SVGIconComponents/UserIcon";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export default function LandingPage() {
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
    <Box className ={styles["top-container"]}>
      <Box className={styles.topbar}>
        <img
          id={styles["logo-icon"]}
          src="/images/app-logo.png"
          width="80px"
          height="80px"
          alt="logo for playful penguins"
        />
        <Box id={styles["user-icon"]}>
          <UserIcon />
        </Box>
      </Box>

      <Box className={styles["slogan-container"]}>
        <Typography
          variant="h3"
          fontWeight="fontWeightRegular"
          className={` ${styles["slogan-first-line"]}`}
        >
          Can't decide what to eat? no worries
        </Typography>

        <Typography
          variant="h2"
          fontWeight="fontWeightBold"
          className={` ${styles["slogan-second-line"]}`}
        >
          PLAYFUL PENGUINS GOT YOU COVERED
        </Typography>
      </Box>

      <Box className={styles["CTAs-container"]}>
        <Box className={`${styles["CTA"]} ${styles["CTA-takeout"]}`}>
          <Typography variant="h5" fontWeight="fontWeightMedium">
            Don't feel like cooking, we got you&nbsp;
            <strong>
              many healthy takeout options to choose from your loved brands
            </strong>
          </Typography>
          <button
            onClick={openTakeoutPage}
            id={`${styles["CTA-button-takeout"]}`}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Takeout
            </Typography>
          </button>
        </Box>
        <Box className={`${styles["CTA"]} ${styles["CTA-cook"]}`}>
          <Typography variant="h5" fontWeight="fontWeightMedium">
            You got <strong>some saute skills,</strong>&nbsp; playful penguins
            got you a<strong> range of recipes</strong> to put your skills to
            test !
          </Typography>

          <button onClick={openCookPage} id={`${styles["CTA-button-cook"]}`}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Cook at home
            </Typography>
          </button>
        </Box>
      </Box>
    </Box>
  );
}
