// In client/src/App.jsx

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase';

// Import all our pages
import Dashboard from './pages/Dashboard';
import CreateGame from './pages/CreateGame';
import ViewGame from './pages/ViewGame';
import Login from './pages/Login';
import HandleLogin from './pages/HandleLogin';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener from Firebase is the key to our auth system
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // While Firebase is checking the auth state, we can show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <main className="container">
        <nav>
          <ul>
            <li>
              <Link to="/"><strong>Pickup Play</strong></Link>
            </li>
          </ul>
          <ul>
            {user && ( // Only show logout if a user is logged in
              <li>
                <button onClick={handleLogout} className="secondary">Logout</button>
              </li>
            )}
          </ul>
        </nav>
        
        <Routes>
          {/* If user is not logged in, all roads lead to the login page */}
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/handle-login" element={<HandleLogin />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* If user is logged in, they can access the app */}
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/create" element={<CreateGame user={user} />} />
              <Route path="/game/:shareableId" element={<ViewGame user={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;