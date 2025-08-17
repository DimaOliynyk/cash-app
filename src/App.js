import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import './App.css';

import { getUser } from './api';

import HomePage from './pages/GetStartedPage/index';
import LoginPage from './pages/LoginPage/index';
import DashboardPage from './pages/DashboardPage/index';
import AddExpendsPage from './pages/AddExpendsPage';
import AddIncomePage from './pages/AddIncomePage';
import ProfilePage from './pages/ProfilePage';
import ExpenseInfoPage from './pages/ExpenseInfoPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

// const getUser = ({ token, children }) => {
//   return token ? children : <Navigate to="/login" replace />;
// };

function App() {
  // localStorage.clear()
  // Initialize token state from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  // Sync token state with localStorage on mount (optional)

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return; // skip if no token
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [token]);

  // if (!token) {
  //   // Pass setToken to LoginPage so it can update token after login
  //   return <LoginPage setToken={setToken} />;
  // }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage setToken={setToken}/>} />
        <Route path="/verify/:token" element={<VerifyEmailPage />} />
        {/* Protected routes */}
        <Route
          path="/profile/:userId"
          element={token ? <ProfilePage setToken={setToken} user={user}/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard/:userId"
          element={token ? <DashboardPage user={user}/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard/addExpense/:userId"
          element={token ? <AddExpendsPage user={user}/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard/addIncome/:userId"
          element={token ? <AddIncomePage user={user}/> : <Navigate to="/login" replace />}
        />
        <Route
          path="/transactions/:transactionId"
          element={token ? <ExpenseInfoPage user={user}/> : <Navigate to="/login" replace />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to={`/dashboard/${localStorage.getItem("username")}`} replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}


export default App;