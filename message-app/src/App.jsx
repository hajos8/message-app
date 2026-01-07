import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import MessagePage from './pages/MessagePage.jsx'
import SearchPage from './pages/SearchPage.jsx'

import './App.css'

function RequireAuth({ loggedIn, redirectTo }) {
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={() => setLoggedIn(true)} />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth loggedIn={loggedIn} redirectTo="/login" />}>
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      <Route path="*" element={<Navigate to={loggedIn ? "/contacts" : "/login"} replace />} />
    </Routes>
  );
}

export default App
