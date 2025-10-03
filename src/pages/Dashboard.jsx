import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://nu-pickup-sports-api-9296628194a6.herokuapp.com/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <>
      {/* The new "Hero" section */}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2>Organize Pickup Games, Instantly.</h2>
        <p>The easiest way to see who's playing at your university.</p>
        <Link to="/create" role="button" style={{ width: 'auto' }}>Create a Game Now</Link>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Upcoming Games</h3>
      {loading && <p>Loading available games...</p>}
      {!loading && games.length === 0 ? (
        <p>No games have been created yet. Be the first!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {/* We now display games as "cards" */}
          {games.map((game) => (
            <Link to={`/game/${game.shareableId}`} key={game._id} style={{ textDecoration: 'none' }}>
              <article>
                <header><strong>{game.sport}</strong></header>
                <p>{game.location}</p>
                <p>{new Date(game.time).toLocaleString()}</p>
                <footer>
                  <strong>{game.playersJoined.length} / {game.slots}</strong> joined
                </footer>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;