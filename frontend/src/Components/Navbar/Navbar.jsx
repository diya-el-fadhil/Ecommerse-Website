import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { AdminContext } from '../../Context/AdminContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const { isAdmin, logout } = useContext(AdminContext); 

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    logout();
    window.location.replace('/');
  };

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu('shop'); }} style={{ textDecoration: 'none' }} className="nav-logo">
        <p>STORED</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        {!isAdmin && (
          <>
            <li onClick={() => { setMenu('shop'); }}><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link></li>
            <li onClick={() => { setMenu('mens'); }}><Link to='/products' style={{ textDecoration: 'none' }}>Products</Link></li>
            <li onClick={() => { setMenu('profile'); }}><Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link></li>
          </>
        )}
      </ul>
      <div className="nav-login-cart">
        {!isAdmin ? (
          <>
            <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>
            <button><Link to="/admin/login" className="admin-login-btn">Admin</Link></button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        {!isAdmin && (
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
