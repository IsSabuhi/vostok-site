import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hook/use-auth';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginView from './Views/Login/LoginView';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme();

function App() {
  const { logout, isAuthenticated, login, success, error } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {isAuthenticated() ? (
          <Sidebar onLogout={handleLogout} />
        ) : (
          <Box
            sx={{
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LoginView />
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
