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
import styles from "./SignUpPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../../services/UserService";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleClickShowConfirmedPassword = () =>
    setShowConfirmedPassword((show) => !show);

  const handleMouseDownConfirmedPassword = (event) => {
    event.preventDefault();
  };

  const form = useForm({
    defaultValues: {
      // TODO: remove Kenny Lam after we add input field for name
      name: "Kenny Lam",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setIsPasswordMatch(false);
      return;
    }
    setIsPasswordMatch(true);
    try {
      const response = await signup(data.name, data.email, data.password);
      console.log(response);
      setError(false);
    } catch (error) {
      if (error.message.includes("duplicate")) {
        console.error("Email is already used");
        setIsError(true);
        setErrorMessage("Email is already used");
      } else {
        console.error(error.message);
        setIsError(true);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Box className={styles["top-container"]}>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "stretch",
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
            padding: "20px",
            gap: "50px",
            border: "3px solid transparent",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            width: "500px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h4" fontWeight="fontWeightBold" marginTop="30px">
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
            {/* TODO: Add name input field and style the form and the error message a bit*/}
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                type="email"
                label="Email"
                sx={{ width: 400 }}
                {...register("email", {
                  required: "Please enter a valid email address",
                })}
              ></TextField>
              {errors.email && (
                <Typography style={{ color: "red" }}>
                  {errors.email.message}
                </Typography>
              )}
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
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <Typography style={{ color: "red" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: 400 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirmed-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirmed-password"
                  type={showConfirmedPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmedPassword}
                        onMouseDown={handleMouseDownConfirmedPassword}
                        edge="end"
                      >
                        {showConfirmedPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please enter password again",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <Typography style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </Typography>
                )}
              </FormControl>
              {!isPasswordMatch && (
                <Typography style={{ color: "red" }}>
                  Passwords do not match. Please try again.
                </Typography>
              )}

              <Button
                type="submit"
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
            </form>
            {isError && (
              <Typography style={{ color: "red" }}>{errorMessage}</Typography>
            )}
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
  );
}
