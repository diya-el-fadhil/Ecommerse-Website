import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, AdminContext } from './Context/AdminContext';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Profile from './Pages/Profile';
import AdminSignup from './Pages/Admin/AdminSignup';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddProduct from './Pages/Admin/AddProduct';
import ListProduct from './Pages/Admin/ListProduct';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

export const backend_url = 'http://localhost:4000';
export const currency = '₹';

const ThemedApp = () => {
  const { theme } = useContext(AdminContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Shop gender="all" />} />
            <Route path="/products" element={<ShopCategory category="product" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
            <Route path="/admin/add-product" element={<ProtectedRoute component={AddProduct} />} />
            <Route path="/admin/list-product" element={<ProtectedRoute component={ListProduct} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AdminProvider>
      <ThemedApp />
    </AdminProvider>
  );
}

export default App;
