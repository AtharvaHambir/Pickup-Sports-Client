import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewGame() {
  // STEP 1: DEFINE YOUR LIVE URL HERE
  const API_URL = "https://nu-pickup-sports-api-9296628194a6.herokuapp.com";

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { shareableId } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const fetchGame = async () => {
    try {
      setLoading(true);
      // STEP 2: USE THE API_URL CONSTANT
      const response = await axios.get(`${API_URL}/api/games/${shareableId}`);
      setGame(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching game data', err);
      setError('Could not load game details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [shareableId]);

  const handleJoinGame = async (e) => {
    e.preventDefault();
    if (!playerName) {
      setError('Please enter your name to join.');
      return;
    }
    try {
      // STEP 2: USE THE API_URL CONSTANT
      const response = await axios.put(`${API_URL}/api/games/${shareableId}/join`, { name: playerName });
      setGame(response.data);
      setPlayerName('');
      setError('');
    } catch (err) {
      console.error('Error joining game', err);
      setError(err.response?.data?.message || 'Could not join the game.');
    }
  };

  const handleRemovePlayer = async (playerName) => {
    if (window.confirm(`Are you sure you want to remove ${playerName}?`)) {
        try {
            // STEP 2: USE THE API_URL CONSTANT
            const response = await axios.put(`${API_URL}/api/games/${shareableId}/remove`, { playerName });
            setGame(response.data);
            setError('');
        } catch (err) {
            console.error('Error removing player', err);
            setError('Could not remove the player.');
        }
    }
  };


  if (loading) {
    return <p>Loading game details...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  const isGameFull = game.playersJoined.length >= game.slots;

  return (
    <>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>{game.sport}</h1>
        <p>Game created by <strong>{game.playersJoined[0]?.name || 'Unknown'}</strong></p>
      </header>

      <div className="grid">
        <article>
          <h3 style={{marginTop: 0}}>Details</h3>
          <ul>
            <li><strong>Location:</strong> {game.location}</li>
            <li><strong>Time:</strong> {new Date(game.time).toLocaleString()}</li>
          </ul>
        </article>

        <article>
          <h3 style={{marginTop: 0}}>Players</h3>
          <p>{game.playersJoined.length} / {game.slots} joined</p>
          <progress value={game.playersJoined.length} max={game.slots}></progress>
          <strong>Players Joined:</strong>
          <ul>
            {game.playersJoined.map((player, index) => (
              <li key={index}>
                {player.name}
                <button 
                  onClick={() => handleRemovePlayer(player.name)} 
                  style={{ marginLeft: '10px', padding: '0 5px', background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}
                  title={`Remove ${player.name}`}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>

          {isGameFull ? (
            <p><strong>This game is full!</strong></p>
          ) : (
            <form onSubmit={handleJoinGame}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name to join"
                required
              />
              <button type="submit">Join Game</button>
            </form>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </article>
      </div>
    </>
  );
}

export default ViewGame;