import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import MessagePage from './pages/MessagePage.jsx'
import SearchPage from './pages/SearchPage.jsx'

import { Snackbar } from '@mui/material'

import SpinnerComponent from './components/SpinnerComponent.jsx'

import './App.css'

function RequireAuth({ loggedIn, redirectTo }) {
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // Set to true for testing purposes

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage setUserId={setUserId} setUsername={setUsername} setLoggedIn={setLoggedIn} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading} />} />
        <Route path="/register" element={<RegisterPage setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading} />} />

        <Route element={<RequireAuth loggedIn={loggedIn} redirectTo="/login" />}>
          <Route path="/messages" element={<MessagePage userId={userId} username={username} />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route path="*" element={<Navigate to={loggedIn ? "/messages" : "/login"} replace />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        onClose={handleClose}
        message={snackbarMessage}
        autoHideDuration={1500}
      />

      {loading && <SpinnerComponent />}
    </>
  );
}

export default App
