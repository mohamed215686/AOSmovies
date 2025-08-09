import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { dosendEmailVerification } from '../../firebase/auth';
import './VerifyEmail.css';

const VerifyEmail = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || currentUser?.email;

    const checkVerification = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                navigate('/profile');
            }
        }
    };

    useEffect(() => {
        // Initial check
        checkVerification();
        
        // Set up interval for periodic checks
        const interval = setInterval(checkVerification, 5000);
        return () => clearInterval(interval);
    }, [navigate]);

    // Countdown timer for resend button
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResendVerification = async () => {
        if (!currentUser) return;
        
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await dosendEmailVerification(currentUser);
            setSuccess('Verification email resent successfully!');
            setCountdown(30);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-email-container">
            <div className="verify-email-card">
                <h2>Verify Your Email Address</h2>
                
                <div className="verification-message">
                    <p>We've sent a verification email to:</p>
                    <p className="user-email">{currentUser?.email}</p>
                    <p>Please check your inbox and click the verification link.</p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="action-buttons">
                    <button
                        onClick={handleResendVerification}
                        disabled={loading || countdown > 0}
                        className="resend-button"
                    >
                        {loading ? 'Sending...' : 
                         countdown > 0 ? `Resend in ${countdown}s` : 'Resend Verification Email'}
                    </button>
                </div>

                <div className="troubleshooting">
                    <h4>Didn't receive the email?</h4>
                    <ul>
                        <li>Check your spam/junk folder</li>
                        <li>Make sure you entered the correct email address</li>
                        <li>Wait a few minutes and try again</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;