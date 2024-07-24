import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const login = () => setIsAdmin(true);
  const logout = () => {
    setIsAdmin(false);
    setTheme('light'); 
  };
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, theme, toggleTheme }}>
      {children}
    </AdminContext.Provider>
  );
};
