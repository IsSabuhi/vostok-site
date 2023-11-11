import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormData {
  username: string;
  password: string;
}

const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const login = (formData: AuthFormData) => {
    const { username, password } = formData;
    const isValidCredentials = username === 'admin' && password === 'admin';

    if (isValidCredentials) {
      setLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setSuccess(true);
      navigate('admin');
      setError(null);
    } else {
      setLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      setError('Неверные учетные данные.');
      setSuccess(false);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const isAuthenticated = () => {
    return isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  };

  return {
    login,
    logout,
    isAuthenticated,
    error,
    success,
  };
};

export default useAuth;
