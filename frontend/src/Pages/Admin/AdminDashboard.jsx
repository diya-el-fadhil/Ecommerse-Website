import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const { logout } = useContext(AdminContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      {/* <button onClick={logout}>Logout</button> */}

      <Link to="/admin/add-product">
        <button>Add Product</button>
      </Link>
      <Link to="/admin/list-product">
        <button>List Products</button>
      </Link>

      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
