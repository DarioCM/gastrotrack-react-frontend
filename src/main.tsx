import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard.tsx';
import DailyDietLogs from './pages/DailyDietLogs.tsx';
import FoodSymptomLogs from './pages/FoodSymptomLogs.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes (With Navbar) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<App />}> {/* Navbar is inside App */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily-diet-logs" element={<DailyDietLogs />} />
            <Route path="/food-symptom-logs" element={<FoodSymptomLogs />} />            
          </Route>
        </Route>
       

      </Routes>
    </Router>
  </StrictMode>,
);
