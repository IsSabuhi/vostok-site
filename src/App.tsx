import React, { useEffect } from 'react';
import './App.css';
import useAuth from './hook/use-auth';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginView from './Views/Login/LoginView';
import Sidebar from './components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

const theme = createTheme();

function App() {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Routes>
          <Route path='/login' element={<LoginView />} />

          <Route path='/admin' element={<Sidebar onLogout={handleLogout} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
