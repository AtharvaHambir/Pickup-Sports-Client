import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateGame from './pages/CreateGame';
import ViewGame from './pages/ViewGame';
import Dashboard from './pages/Dashboard';

function App() {
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
            <li>
              {/* This is a disabled button. It acts as a placeholder 
                  for the profile feature we'll build after launch. */}
              <a href="#" role="button" className="secondary" aria-disabled="true">Profile</a>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/game/:shareableId" element={<ViewGame />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;