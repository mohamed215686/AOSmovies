
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
const AuthContext = React.createContext();


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe =onAuthStateChanged(auth, initializeUser)

        return unsubscribe;
    }, []);
    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user});
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
        
    }
    return (
        <AuthContext.Provider value={{ currentUser,userLoggedIn, loading }}>
        {!loading && children}
        </AuthContext.Provider>
    );
}