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
  CardMedia,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { authenticateGoogleUser, login } from "../../services/UserService";
import { useForm } from "react-hook-form";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginPage({ setToken }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await authenticateGoogleUser(codeResponse);
      setToken(response.id_token);
      navigate('/');
    },
    onError: () => {
      // Handle login errors here
      console.error("Google login failed");
    },
    flow: "auth-code",
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      if (response && response.user) {
        setToken(response.user.token);
        navigate("/");
      }
      setIsError(false);
    } catch (error) {
      console.error(error.message);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <Box className={styles["top-container"]}>
      <Box className={styles.topbar}>
        <Link to="/">
          <Box>
            <CardMedia
              component="img"
              id={styles["logo-icon"]}
              className={styles["recipe-photo"]}
              src="/images/app-logo.png"
              sx={{
                height: {
                  xs: "60px",
                  sm: "70px",
                  md: "70px",
                  lg: "80px",
                },
                width: {
                  xs: "60px",
                  sm: "70px",
                  md: "70px",
                  lg: "80px",
                },
                padding: "8px 8px",
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box
        className={styles["form-container"]}
        sx={{
          width: {
            xs: "220px",
            sm: "300px",
            md: "470px",
          },
          gap: {
            xs: "10px",
            sm: "10px",
            md: "40px",
          },
          padding: {
            xs: "20px 10px",
            sm: "40px  20px",
            md: "40px  30px",
          },
        }}
      >
        <Box className={styles["text-field-group"]}>
          <Typography
            variant="h4"
            fontWeight="fontWeightBold"
            sx={{
              fontSize: {
                xs: "24px",
                md: "28px",
              },
              marginBottom: "8px",
            }}
          >
            Welcome back!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="email"
              label="Email"
              sx={{
                width: { xs: 200, sm: 280, md: 400 },
                "& .MuiInputBase-root": {
                  height: 40,
                  padding: "0 14px",
                },
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, 10px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
              }}
              {...register("email", {
                required: "Please enter a valid email address",
              })}
            ></TextField>
            {errors.email && (
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  style={{ color: "red" }}
                  sx={{
                    fontSize: {
                      xs: "8px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  {errors.email.message}
                </Typography>
              </Box>
            )}
            <FormControl
              sx={{
                m: 1,
                width: { xs: 200, sm: 280, md: 400 },
                margin: 0,
                "& .MuiInputBase-root": {
                  height: 40,
                  padding: "0 14px",
                },
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, 10px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
              }}
              variant="outlined"
            >
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
                {...register("password", {
                  required: "Please enter your password",
                })}
              />
            </FormControl>
            {errors.password && (
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {" "}
                <Typography
                  style={{ color: "red" }}
                  sx={{
                    fontSize: {
                      xs: "8px",
                      sm: "10px",
                      md: "12px",
                    },
                  }}
                >
                  {errors.password.message}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                sx={{
                  width: { xs: 200, sm: 280, md: 400 },
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
              {isError && (
                <Typography style={{ color: "red" }}>{errorMessage}</Typography>
              )}

              <Button
                onClick={googleLogin}
                sx={{
                  width: { xs: 200, sm: 280, md: 400 },
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
                  width: { xs: 200, sm: 280, md: 400 },
                  color: "color",
                  padding: "10px",
                }}
               
              />

              <Typography
                variant="body2"
                fontWeight="fontWeightLight"
                sx={{
                  fontSize: {
                    xs: "10px",
                    md: "12px",
                  },
                  padding: "4px 8px",
                }}
              >
                Create an account to start off with your wellness journey!
              </Typography>

              <Button
                onClick={goToSignup}
                sx={{
                  width: { xs: 200, sm: 280, md: 400 },
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
          </form>
        </Box>
      </Box>
    </Box>
  );

}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
};
