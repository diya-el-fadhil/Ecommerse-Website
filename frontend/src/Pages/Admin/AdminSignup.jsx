import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Admin.css';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log('Admin signup:', email, password);
    // After successful signup, redirect to admin login
    navigate('/admin/login');
  };

  return (
    <div className="admin-login-signup-container">
      <div className="admin-form-container">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/admin/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
