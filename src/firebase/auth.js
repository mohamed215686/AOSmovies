import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth} from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { addDoc, collection,updateDoc,getDoc ,doc, setDoc,deleteDoc, Firestore } from "firebase/firestore";
import {db} from "./firebase"; 
import { updatePassword, deleteUser } from 'firebase/auth';
export const doCreateUserWithEmailAndPassword =async (email, password) => {
    
    const user = await createUserWithEmailAndPassword(auth,email, password);
    
    await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: '',
        phoneNumber: '',
        photoURL: '',
        WatcheLater: [],
        WatchHistory: [],
        Liked: [],
    }); 
    const userRef = doc(db, "users", user.uid);
    
}

export function doSignInWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export const dosignewithGoogle = async () => {
    const provider = new GoogleAuthProvider(auth);
    return await signInWithPopup(auth,provider);
}

export const doSignOut = async () => {
    return await auth.signOut();
}


export const doPasswordReset = async (email) => {
    return await sendPasswordResetEmail(auth,email);
}

export const doPasswordUpdate = async (newPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is signed in");
  await updatePassword(user, newPassword);
};
export const dosendEmailVerification = async (user) => {
  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/profile`, // Where to redirect after verification
      handleCodeInApp: true
    };
    await sendEmailVerification(user, actionCodeSettings);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
export const doUpdateProfile = async (displayName, phoneNumber,email) => {
    const user = auth.currentUser;
    
    if (!user) return;

    try {
        // Update Firebase Authentication profile
        await updateProfile(user, {
            displayName: displayName,
            phoneNumber: phoneNumber,
            email: email // Ensure email remains unchanged
        });

        // Update Firestore document
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
            displayName: displayName,
            phoneNumber: phoneNumber,
            email: email // Ensure email remains unchanged
        }, { merge: true });
        
        return true;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};
export const AddToHistory = async (data) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user is currently signed in");
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const currentHistory = userDoc.data().WatchHistory || [];
            // Prevent duplicates (optional)
            if (!currentHistory.some(item => item.id === data.id)) {
                await updateDoc(userRef, {
                    WatchHistory: [...currentHistory, data]
                });
            }
        } else {
            // Create user document if it doesn't exist
            await setDoc(userRef, { 
                WatchHistory: [data],
                uid: user.uid,
                // Add other default user fields if needed
            });
        }
    } catch (error) {
        console.error("Error adding to watch history:", error);
        throw error;
    }
};

export const AddToLiked = async (data) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user is currently signed in");
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const currentLiked = userDoc.data().Liked || [];
            // Prevent duplicates (optional)
            if (!currentLiked.some(item => item.id === data.id)) {
                await updateDoc(userRef, {
                    Liked: [...currentLiked, data]
                });
            }
        } else {
            // Create user document if it doesn't exist
            await setDoc(userRef, { 
                Liked: [data],
                // Add other default user fields if needed
            });
        }
    } catch (error) {
        console.error("Error adding to watch history:", error);
        throw error;
    }
};

export const AddToWatchLater = async (data) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user is currently signed in");
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const currentWatchLater = userDoc.data().WatcheLater || [];
            // Prevent duplicates (optional)
            if (!currentWatchLater.some(item => item.id === data.id)) {
                await updateDoc(userRef, {
                    WatcheLater: [...currentWatchLater, data]
                });
            }
        } else {
            // Create user document if it doesn't exist
            await setDoc(userRef, { 
                WatcheLater: [data],
                // Add other default user fields if needed
            });
        }
    } catch (error) {
        console.error("Error adding to watch later:", error);
        throw error;
    }
}



export const doDeleteAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is signed in");
  
  // Optional: Delete user data from Firestore first
  const userRef = doc(db, "users", user.uid);
  await deleteDoc(userRef);
  
  // Then delete the user account
  await deleteUser(user);
};