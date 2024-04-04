import { PageLayout } from "./components/PageLayout/PageLayout";
import { HomePage } from "./pages/HomePage/HomePage";
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LandingPage from './Views/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/home" element={<PageLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
    

     

   
   
  )
}

export default App;
