import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuth] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });

  const [dataUser, setdataUser] = useState(() => {
    const storedUser = localStorage.getItem('dataUser');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (data) => {
    setIsAuth(true);
    setdataUser(data);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('dataUser', JSON.stringify(data));
  };

  const handleLogout = () => {
    setIsAuth(false);
    setdataUser({});
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('dataUser');
    navigate('/'); // Optional: redirect to homepage on logout
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('Datas/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        handleLogin(foundUser);

        if (foundUser.role === 'admin') {
          navigate('/Admin');
        } else if (foundUser.role === 'cliente') {
          navigate('/Carritos');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, handleLogin, handleLogout, dataUser,
      email, setEmail,
      password, setPassword,
      errors, setErrors,
      handleSubmit
    }}>
      {children}
    </AuthContext.Provider>
  );
};


