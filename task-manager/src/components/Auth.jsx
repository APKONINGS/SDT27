import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [loginError, setLoginError] = useState('');

  const toggleForms = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username: regUsername, email: regEmail, password: regPassword };

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      const message = await response.text();
      alert(message);
      window.location.href = 'index.html'; 
    } catch (error) {
      setRegError('Failed to register: ' + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username: loginUsername, password: loginPassword };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const message = await response.text();
      alert(message);
      window.location.href = 'index.html'; // Adjust as necessary
    } catch (error) {
      setLoginError('Failed to log in: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>User Authentication</h1>

      {isLoginForm ? (
        <div id="loginForm" className="form-section active">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {loginError && <div className="error">{loginError}</div>}
          </form>
          <div className="toggle-link" onClick={toggleForms}>
            Don't have an account? Register
          </div>
        </div>
      ) : (
        <div id="registrationForm" className="form-section active">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="reg-username">Username:</label>
            <input
              type="text"
              id="reg-username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              required
            />
            <label htmlFor="reg-email">Email:</label>
            <input
              type="email"
              id="reg-email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <label htmlFor="reg-password">Password:</label>
            <input
              type="password"
              id="reg-password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
            {regError && <div className="error">{regError}</div>}
          </form>
          <div className="toggle-link" onClick={toggleForms}>
            Already have an account? Log in
          </div>
        </div>
      )}
    </div>
  );
};

export default App;