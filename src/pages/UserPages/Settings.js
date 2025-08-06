import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { doPasswordUpdate, doDeleteAccount } from '../../firebase/auth';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    try {
      await doPasswordUpdate(passwordForm.newPassword);
      setSuccess('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await doDeleteAccount();
        navigate('/login');
        // Account deletion will trigger auth state change
      } catch (error) {
        console.error("Error deleting account:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      
      {/* About Section */}
      <section className="settings-section">
        <h2>About</h2>
        <div className="about-content">
          <p>Welcome to our streaming platform!</p>
          <p>Version: 1.0.0</p>
          <p>Made by MOHAMED AFKIR AND MOAAD YAHYA </p>

          <p>© 2025. All rights reserved.</p>
        </div>
      </section>

      {/* Change Password Section */}
      <section className="settings-section">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength="6"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button 
            type="submit" 
            className="save-btn"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </section>

      {/* Delete Account Section */}
      <section className="settings-section danger-zone">
        <h2>Delete Account</h2>
        <div className="delete-content">
          <p>This will permanently delete your account and all associated data.</p>
          <button 
            onClick={handleDeleteAccount}
            className="delete-btn"
          >
            Delete My Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;