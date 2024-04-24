
import { PageLayout } from "./components/PageLayout/PageLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/home" element={<PageLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
