import { Typography, Box, Button, Divider } from "@mui/material";
import styles from "./SingUpPage.module.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <>
      <Box className={styles["top-container"]}>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
          }}
        >
          <Box className={styles.topbar}>
            <Link to="/">
              <img
                id={styles["logo-icon"]}
                src="/images/app-logo.png"
                width="80px"
                height="80px"
                alt="logo for playful penguins"
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px",
              gap: "60px",
              border: "3px solid transparent",
              borderRadius: "24px",
              backgroundColor: "#ffffff",
              width: "500px",
              height: "480px",
              paddingBottom: "50px",
              marginTop: "70px",
            }}
          >
            <Typography variant="h4" fontWeight="fontWeightBold">
              Sign up with NutriGuin today!
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <TextField label="Username" sx={{ width: 400 }}></TextField>
              <TextField label="Password" sx={{ width: 400 }}></TextField>
              <TextField
                label="Confirm Password"
                sx={{ width: 400 }}
              ></TextField>

              <Button
                sx={{
                  width: 400,
                  border: "2px solid #8e6a70;",
                  borderRadius: "16px",
                  bgcolor: "#8e6a70",
                  color: "white",
                  marginTop: "20px",
                  padding: "10px",
                  "&:hover": {
                    bgcolor: "#fbeff1",
                    color: "black",
                  },
                }}
              >
                <Typography variant="body1" fontWeight="fontWeightBold">
                  Sign up
                </Typography>
              </Button>

              <Divider
                sx={{
                  width: 400,
                  color: "color",
                  padding: "10px",
                }}
                flexItem
              />

              <Typography variant="body2" fontWeight="fontWeightLight">
                Already a member with us, log in!
              </Typography>

              <Button
                sx={{
                  width: 400,
                  border: "2px solid #8e6a70;",
                  borderRadius: "16px",
                  color: "black",
                  padding: "10px",
                  "&:hover": {
                    bgcolor: "#fbeff1",
                  },
                }}
              >
                <Typography variant="body1" fontWeight="fontWeightBold">
                  Log In
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "50%",
            height: "100%",
          }}
        >
          <img
            src="/images/heroImage.png"
            alt="Hero image for the sign up page"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </>
  );
}
