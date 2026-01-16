import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import MessagePage from './pages/MessagePage.jsx'
import MainPage from './pages/MainPage.jsx'


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
        <Route path="/" element={<MainPage loggedIn={loggedIn} />} />
        <Route path="/login" element={<LoginPage setUserId={setUserId} setUsername={setUsername} setLoggedIn={setLoggedIn} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading} />} />
        <Route path="/register" element={<RegisterPage setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading} />} />

        <Route element={<RequireAuth loggedIn={loggedIn} redirectTo="/login" />}>
          <Route path="/messages" element={<MessagePage userId={userId} setUserId={setUserId} username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} setLoading={setLoading} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
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
