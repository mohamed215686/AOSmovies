import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Adjust the import path as necessary

const CompleteVerification = () => {
  const { currentUser, reloadUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      await reloadUser();
      if (auth.currentUser?.emailVerified) {
        navigate('/profile');
      } else {
        navigate('/verify-email');
      }
    };
    
    checkVerification();
  }, [navigate, reloadUser]);

  return <div>Processing verification...</div>;
};

export default CompleteVerification;