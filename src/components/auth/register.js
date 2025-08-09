import React, { useState } from 'react';
import { 
    doCreateUserWithEmailAndPassword, 
    dosendEmailVerification, 
    dosignewithGoogle 
} from '../../firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import './register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  
  setLoading(true);
  setError('');
  
  try {
    const userCredential = await doCreateUserWithEmailAndPassword(email, password);
    console.log('User created:', userCredential.user.uid);
    
    await dosendEmailVerification(userCredential.user);
    console.log('Verification email sent');
    
    setVerificationSent(true);
    navigate('/verify-email', { state: { email: userCredential.user.email } });
  } catch (err) {
    console.error('Full error:', err);
    setError(err.message);
  } 
   finally {
    setLoading(false);
  }
};

    const OnGoogleSignin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await dosignewithGoogle();
            setIsRegistered(true);
            navigate('/profile');
        } catch (err) {
            setIsRegistered(false);
            setError(err.message);
            console.error('Google Sign-in failed:', err.message);
        } finally {
            setLoading(false);
        }
    };

    if (userLoggedIn || isRegistered) {
        return <Navigate to={'/profile'} replace={true} />;
    }

    return (
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <h2>Register</h2>
                {verificationSent && (
                    <div className="verification-message">
                        Verification email sent! Please check your inbox.
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>
                
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                </div>

                <button type="submit" disabled={loading} className='btn-primary'>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                
                <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={OnGoogleSignin}
                    disabled={loading}
                >
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};

export default Register;