import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

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
            const formData = new FormData();
            
            // Append user data
            Object.keys(editedUser).forEach(key => {
                formData.append(key, editedUser[key]);
            });

            // Append profile photo if it exists
            if (profilePhoto) {
                formData.append('profilePhoto', profilePhoto);
            }

            console.log('FormData:', formData);

            const response = await fetch('http://localhost:4000/profile/update', {
                method: 'PUT',
                headers: {
                    'auth-token': token,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedUser = await response.json();
            console.log('Updated user:', updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
            setEditedUser(null);
            setProfilePhoto(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(null);
        setProfilePhoto(null);
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
        }
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
                        <div className="profile-photo-container">
                            {profilePhoto ? (
                                <img
                                    src={URL.createObjectURL(profilePhoto)}
                                    alt="Profile Preview"
                                    className="profile-photo-preview"
                                />
                            ) : user.profilePhotoUrl ? (
                                <img
                                    src={user.profilePhotoUrl}
                                    alt="Current Profile"
                                    className="profile-photo"
                                />
                            ) : null}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="photo-input"
                            />
                        </div>
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
                        <div className="profile-photo-container">
                            {user.profilePhotoUrl && (
                                <img
                                    src={user.profilePhotoUrl}
                                    alt="Profile"
                                    className="profile-photo"
                                />
                            )}
                        </div>
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
