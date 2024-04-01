import "./App.css";
import PageLayout from "./components/PageLayout/PageLayout";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
