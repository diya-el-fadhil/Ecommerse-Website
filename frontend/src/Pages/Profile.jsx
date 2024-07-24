import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                console.log('Token:', token);
                
                if (!token) {
                    throw new Error('No auth token found');
                }
                const response = await fetch('http://localhost:4000/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Profile data:', data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError(error.message);
            }
        };
        fetchUserProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedUser({ ...user });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch('http://localhost:4000/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedUser = await response.json();
            console.log('Updated user:', updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
            setEditedUser(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(null);
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    if (!user) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile Page</h1>
            <div className="profile-info">
                {isEditing ? (
                    <>
                        <input
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="profile-input"
                        />
                        <input
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="profile-input"
                        />
                        <input
                            name="location"
                            value={editedUser.location || ''}
                            onChange={handleChange}
                            placeholder="Location"
                            className="profile-input"
                        />
                        <input
                            name="mobileNumber"
                            value={editedUser.mobileNumber || ''}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="profile-input"
                        />
                        <div className="button-container">
                            <button onClick={handleSave} className="save-button">Save</button>
                            <button onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Location:</strong> {user.location || 'Not specified'}</p>
                        <p><strong>Mobile Number:</strong> {user.mobileNumber || 'Not specified'}</p>
                        <button onClick={handleEdit} className="edit-button">Edit Profile</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
