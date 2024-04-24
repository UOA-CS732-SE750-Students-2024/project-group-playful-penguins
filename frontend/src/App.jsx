import { PageLayout } from "./components/PageLayout/PageLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import RecipeInfo from "./components/RecipeInfo/RecipeInfo";
import { createTheme, ThemeProvider } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipe" element={<RecipeInfo />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
