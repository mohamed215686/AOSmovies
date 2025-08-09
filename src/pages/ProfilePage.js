import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

import Settings from './UserPages/Settings';
import History from './UserPages/History';    
import Liked from './UserPages/Liked';
import WatchLater from './UserPages/WatchLater';
import Profile from './UserPages/Profile';

const ProfilePage = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const [activeContent, setActiveContent] = useState('profile');

    const navigate = useNavigate();

const handleLogout = async () => {
    if (userLoggedIn) {
        try {
            await doSignOut();
            console.log("User logged out successfully");
            navigate('/login');  // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
};

    const renderContent = () => {
        switch(activeContent) {
            case 'settings':
                return <Settings />;
            case 'history':
                return <History />;
            case 'liked':
                return <Liked />;
            case 'watchlater':
                return <WatchLater />;
            default:
                return <Profile/>;
        }
    };

    return (
        <div className="profile-layout">
            <div className="navigation-sidebar">
                <div className="user-profile-summary">
                    <div className="sidebar-avatar">
                        {currentUser?.photoURL ? (
                            <img src={currentUser.photoURL} alt="Profile" />
                        ) : (
                            <div className="avatar-placeholder">
                            {currentUser?.displayName 
                                ? currentUser.displayName.charAt(0).toUpperCase() 
                                : currentUser?.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <p className="sidebar-username">{currentUser?.displayName?.trim() || 
                    currentUser?.email?.split('@')[0] || 
                    'User'}
                    </p>
                </div>
                
                <nav className="navigation-links">
                    <button 
                        className={activeContent === 'profile' ? 'active' : ''}
                        onClick={() => setActiveContent('profile')}
                    >
                        Profile
                    </button>
                    <button 
                        className={activeContent === 'settings' ? 'active' : ''}
                        onClick={() => setActiveContent('settings')}
                    >
                        Settings
                    </button>
                    <button 
                        className={activeContent === 'history' ? 'active' : ''}
                        onClick={() => setActiveContent('history')}
                    >
                        History
                    </button>
                    <button 
                        className={activeContent === 'liked' ? 'active' : ''}
                        onClick={() => setActiveContent('liked')}
                    >
                        Liked
                    </button>
                    <button 
                        className={activeContent === 'watchlater' ? 'active' : ''}
                        onClick={() => setActiveContent('watchlater')}
                    >
                        Watch Later
                    </button>
                </nav>

                <button 
                    className={`sidebar-logout-btn ${!userLoggedIn ? 'disabled' : ''}`}
                    onClick={handleLogout} 
                    disabled={!userLoggedIn}
                >
                    Logout
                </button>
            </div>

            
            <div className="content-area">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfilePage;