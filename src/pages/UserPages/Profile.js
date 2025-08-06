import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { updateProfile } from 'firebase/auth';
import './Profile.css';
import { doUpdateProfile } from '../../firebase/auth';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
const Profile = () => {
    const { currentUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        phoneNumber: '',
        email: currentUser?.email || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    // Get from Auth first
                    const authData = {
                        displayName: currentUser.displayName || '',
                        phoneNumber: currentUser.phoneNumber || '',
                        email: currentUser.email || ''
                    };
                    
                    // Then check Firestore
                    const userRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(userRef);
                    
                    if (docSnap.exists()) {
                        const firestoreData = docSnap.data();
                        setFormData({
                            displayName: firestoreData.displayName || authData.displayName,
                            phoneNumber: firestoreData.phoneNumber || authData.phoneNumber,
                            email: authData.email
                        });
                    } else {
                        setFormData(authData);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await doUpdateProfile(formData.displayName, formData.phoneNumber, formData.email);
            
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getEmailInitial = () => {
        return currentUser?.email ? currentUser.email[0].toUpperCase() : '?';
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <h2 className="profile-title">User Profile</h2>
                {error && <div className="error-message">{error}</div>}

                {editMode ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={currentUser?.email || ''}
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+1234567890"
                            />
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                onClick={() => setEditMode(false)}
                                className="cancel-btn"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="save-btn"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div className="avatar-container">
                            <div className="text-avatar">
                                {getEmailInitial()}
                            </div>
                        </div>

                        <div className="profile-details">
                            <p><strong>Name:</strong> {currentUser?.displayName || 'Not set'}</p>
                            <p><strong>Email:</strong> {currentUser?.email}</p>
                            <p><strong>Phone:</strong> {formData.phoneNumber || 'Not provided'}</p>
                            {currentUser?.metadata && (
                                <>
                                    <p><strong>Account Created:</strong> {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
                                    <p><strong>Last Login:</strong> {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()}</p>
                                </>
                            )}
                        </div>

                        <button 
                            onClick={() => setEditMode(true)}
                            className="edit-btn"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
