import React from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../../contexts/authContext'
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import './History.css'
const History = () => {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);

useEffect(() => {
    const fetchHistory = async () => {
        if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setHistory(docSnap.data().WatchHistory || []);
            }
        }
    };
    fetchHistory();
}, [currentUser]);
  if (!currentUser) {
    return <div>Please log in to view your watch history.</div>;
  }

  return (
    <div className="history-container">
      <h2 className="history-header">Watch History</h2>
      
      {history.length === 0 ? (
        <p className="history-empty">No watch history found</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <Card 
                className="history-card"
                data={item}
                trending={false}
                media_type={item.media_type}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History
