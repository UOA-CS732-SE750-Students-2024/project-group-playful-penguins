import {
  Typography,
  Box,
  Button,
  Divider,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./LoginPage.module.css";
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google'; 
import { authenticateGoogleUser } from "../../services/UserService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      response = await authenticateGoogleUser(codeResponse);
      console.log(response);
    },
    onError: () => {
      // Handle login errors here
      console.error('Google login failed');
    },
    flow: 'auth-code',
  });

  return (
    <>
      <Box className={styles["top-container"]}>
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
          <Typography variant="h4" fontWeight="fontWeightBold">
            Welcome back!
          </Typography>
          <Box className={styles["text-field-group"]}>
            <TextField label="Username" sx={{ width: 400 }}></TextField>
            <FormControl sx={{ m: 1, width: 400 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
                Log in
              </Typography>
            </Button>
            <Button
              onClick={googleLogin}
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
                Sign in using Google
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
              Create an account to start off with your wellness journey!
            </Typography>

            <Button
              sx={{
                width: 400,
                border: "2px solid #8e6a70;",
                borderRadius: "16px",
                bgcolor: "#8e6a70",
                color: "white",
                padding: "10px",
                "&:hover": {
                  bgcolor: "#fbeff1",
                  color: "black",
                },
              }}
            >
              <Typography variant="body1" fontWeight="fontWeightBold">
                Sign Up
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
