import React, { useState } from 'react';
import {doSignInWithEmailAndPassword,dosignewithGoogle} from '../../firebase/auth';
import {AuthProvider, useAuth} from '../../contexts/authContext'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const {userLoggedIn} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [error, setError] = useState('');
    const OnSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email, 'Password:', password);
        if(!isSignedIn) {
            doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    setIsSignedIn(true);
                    setError('');
                })
                .catch((err) => {
                    setIsSignedIn(false);
                    setError(err.message);
                    console.error('Login failed:', err.message);
                });
                navigate('/profile');
        }
    };

     const OnGoogleSignin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email, 'Password:', password);
        if(!isSignedIn) {
            dosignewithGoogle()
                .then(() => {
                    setIsSignedIn(true);
                    setError('');
                })
                .catch((err) => {
                    setIsSignedIn(false);
                    setError(err.message);
                    console.error('Google Sign-in failed:', err.message);
                });
                navigate('/profile');
        }
    };
    return (
  <AuthProvider>
    <div className="login-container">
      {userLoggedIn && (<Navigate to="/Profile" replace={true} />)}
      <form className="login-form" onSubmit={OnSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-primary" disabled={isSignedIn}>
          Login
        </button>
        <button type="button" className="btn-secondary" onClick={OnGoogleSignin}>
          Sign in with Google
        </button>
        <p className="signup-link">
          Don't have an account?
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  </AuthProvider>

    );
};

export default Login;
