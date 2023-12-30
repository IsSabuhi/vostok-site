import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface AuthData {
  username: string;
  password: string;
}

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setAuthenticated(true);
    }
  }, []);

  const login = (credentials: AuthData) => {
    const isValidCredentials =
      credentials.username === 'Admin' && credentials.password === 'A2IHZNW1jKcJQuf@lVRi!';

    if (isValidCredentials) {
      localStorage.setItem('isAuthenticated', 'true');
      setAuthenticated(true);
      navigate('/admin');
      setError(null);
    } else {
      setError('Неверные имя пользователя или пароль');
      setAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
    setAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    error,
  };
};

export default useAuth;
