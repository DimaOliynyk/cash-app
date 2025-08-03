import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import './App.css';

import HomePage from './pages/GetStartedPage/index';
import LoginPage from './pages/LoginPage/index';
import DashboardPage from './pages/DashboardPage/index';
import AddExpendsPage from './pages/AddExpendsPage';
import AddIncomePage from './pages/AddIncomePage';
import ProfilePage from './pages/ProfilePage';
import ExpenseInfoPage from './pages/ExpenseInfoPage';

function App() {
  // localStorage.clear()
  // Initialize token state from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Sync token state with localStorage on mount (optional)
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (!token) {
    // Pass setToken to LoginPage so it can update token after login
    return <LoginPage setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <Routes>
        {/* Pass setToken to ProfilePage for logout */}
        <Route path="/profile/:userId" element={<ProfilePage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/dashboard/:userId" element={<DashboardPage />} />
        <Route path="/dashboard/addExpense/:userId" element={<AddExpendsPage />} />
        <Route path="/dashboard/addIncome/:userId" element={<AddIncomePage />} />
        <Route path="/transactions/:transactionId" element={<ExpenseInfoPage />} />
        <Route
          path="/"
          element={<Navigate to={`/dashboard/${localStorage.getItem("username")}`} replace />}
        />
      </Routes>
    </div>
  );
}


export default App;