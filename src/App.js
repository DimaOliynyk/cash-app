import React, { useState } from 'react';
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import './App.css';

import HomePage from './pages/GetStartedPage/index';
import LoginPage from './pages/LoginPage/index';
import DashboardPage from './pages/DashboardPage/index';
import AddExpendsPage from './pages/AddExpendsPage';
import AddIncomePage from './pages/AddIncomePage';

function App() {
  // localStorage.clear()
  const [token, setToken] = useState();

  if(!localStorage.getItem("token")) {
    return <LoginPage setToken={setToken} />
  } 

  return (
    <div className="wrapper">
      <Routes>
            <Route path="/dashboard/:userId" element={<DashboardPage/>}/>
            <Route path="/dashboard/addExpense/:userId" element={<AddExpendsPage/>}/>
            <Route path="/dashboard/addIncome/:userId" element={<AddIncomePage/>}/>
            <Route
              path="/"
              element={<Navigate to={`/dashboard/${localStorage.getItem("username")}`} replace />}
            />
            {/* <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="concerts">
              <Route index element={<ConcertsHome />} />
              <Route path=":city" element={<City />} />
              <Route path="trending" element={<Trending />} />
            </Route> */}
        </Routes>
    </div>
  );
}

export default App;