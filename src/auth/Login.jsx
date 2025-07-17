import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const {
    handleLogin, dataUser,isAuthenticated,
    email, setEmail,
    password, setPassword,
    errors, setErrors
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser) {
      if (dataUser && isAuthenticated && dataUser.role === 'admin') {
        navigate('/Admin');
      }
    }
  }, [dataUser, navigate]);

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
        }
        // no redirección inmediata para cliente, se muestra debajo
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Intenta de nuevo más tarde.' });
    }
  };

  return (
    <>
      <Header />
      <main className="mainposventas">
        <section className="container">
          <h1>Panel de Login</h1>
        </section>

        <section className="container">
          {isAuthenticated ? (
            dataUser.role === 'cliente' ? (
              <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <h2>Bienvenido, {dataUser.name}</h2>
                <p>Email: {dataUser.email}</p>
                <p>Rol: {dataUser.role}</p>
                {/* 這裡可以加上更多個人資訊或操作按鈕 */}
              </div>
            ) : null
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: 'auto',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email address
                </label>
                <input
                  id="formBasicEmail"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                  }}
                />
                {errors.email && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Password
                </label>
                <input
                  id="formBasicPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                  }}
                />
                {errors.password && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Submit
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;


/* import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const Login = () => {

  const { handleLogin, dataUser,
          email, setEmail,
          password, setPassword,
          errors, setErrors

  } = useContext(AuthContext);


const navigate = useNavigate();



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
        setErrors({ email: 'credenciales invalidas' });
      } else {
        console.log('User role:', foundUser.role);

        if (foundUser.role === 'admin') {
          handleLogin(foundUser);

          navigate('/Admin');
        } else {
          if (foundUser.role === 'cliente') {
            handleLogin(foundUser);
            navigate('/Carritos');
          } else {
            navigate('/');
          }

        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.' });
    }
  } 




  return (
    <>
      <Header />
      <main className="mainposventas">
        <section className="container">
          <h1>Panel de Longin</h1>
        </section>
        <section className="container">
          <div>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '400px',
                margin: 'auto',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email address
                </label>
                <input
                  id="formBasicEmail"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                  }}
                />
                {errors.email && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Password
                </label>
                <input
                  id="formBasicPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
                    borderRadius: '0.25rem',
                  }}
                />
                {errors.password && (
                  <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Submit
              </button>
            </form>

          </div>


        </section>
      </main>



      <Footer />
    </>
  )
}

export default Login
 */