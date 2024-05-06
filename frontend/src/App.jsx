import { PageLayout } from "./components/PageLayout/PageLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import RecipeInfo from "./components/RecipeInfo/RecipeInfo";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

function App() {
  const { token, setToken } = useToken();

  const isAuthenticated = () => {
    if (localStorage.getItem('token')) return true;
    else return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <LandingPage /> : <Navigate to="/login" />
          }
        ></Route>
        <Route path="/home" element={<HomePage />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipeInfo />} />
        </Route>
        <Route
          exact
          path="/login"
          element={<LoginPage setToken={setToken} />}
        ></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
