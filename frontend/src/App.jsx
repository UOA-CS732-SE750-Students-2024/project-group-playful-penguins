import { useState } from 'react'
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import './App.css'
import LandingPage from './Views/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>

      </Route>

    </Routes>
   
  )
}

export default App
