// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRV1DvyyvUY0aFTqx89WpUZbMT9C72awA",
  authDomain: "aosmovies-b4d4d.firebaseapp.com",
  projectId: "aosmovies-b4d4d",
  storageBucket: "aosmovies-b4d4d.firebasestorage.app",
  messagingSenderId: "223599460342",
  appId: "1:223599460342:web:6b048ec25778b707cfd1d7",
  measurementId: "G-F99LW3WB1W"
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


const storage = getStorage(app);
const db=getFirestore(app); // Assuming you have a firestore.js file for Firestore setup
export { app,db, auth,storage, analytics };