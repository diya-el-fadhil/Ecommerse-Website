import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import '../CSS/Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, toggleTheme } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Admin login:', email, password);
    login();
    toggleTheme();
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-login-signup-container">
      <div className="admin-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="admin-form-fields">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/admin/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
