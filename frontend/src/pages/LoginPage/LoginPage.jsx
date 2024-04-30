import { Typography, Box } from "@mui/material";
import styles from "./LoginPage.module.css";
import UserIcon from "../../assets/SVGIconComponents/UserIcon";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";

export default function LoginPage() {
  return (
    <>
      <Box className ={styles["top-container"]}>
        <Box className={styles.topbar}>
          <img
            id={styles["logo-icon"]}
            src="/images/app-logo.png"
            width="80px"
            height="80px"
            alt="logo for playful penguins"
          />
        </Box>
        <Box className={styles["form-container"]}>


        </Box>
      </Box>
    </>
  );
}
