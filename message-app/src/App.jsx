import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import MessagePage from './pages/MessagePage.jsx'
import SearchPage from './pages/SearchPage.jsx'

import './App.css'

function RequireAuth({ loggedIn, redirectTo }) {
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Set to true for testing purposes


  return (
    <Routes>
      <Route path="/login" element={<LoginPage setUserId={setUserId} setUsername={setUsername} setLoggedIn={setLoggedIn} />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth loggedIn={loggedIn} redirectTo="/login" />}>
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      <Route path="*" element={<Navigate to={loggedIn ? "/messages" : "/login"} replace />} />
    </Routes>
  );
}

export default App
