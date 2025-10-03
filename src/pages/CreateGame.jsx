import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateGame() {
  const [formData, setFormData] = useState({
    sport: '',
    location: '',
    time: '',
    slots: '',
    creatorName: '' // State for the new creatorName field
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // We are pointing to your local backend server for testing
      const response = await axios.post('https://nu-pickup-sports-api-9296628194a6.herokuapp.com/api/games', formData);
      
      const newGameId = response.data.shareableId;
      navigate(`/game/${newGameId}`);

    } catch (error) {
      console.error('Error creating game', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create New Game</legend>
        
        {/* The new input field for the creator's name */}
        <input 
          type="text" 
          name="creatorName" 
          placeholder="Your Name" 
          onChange={handleChange} 
          required 
        />
        
        <input type="text" name="sport" placeholder="Sport (e.g., Basketball)" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location (e.g., Rec Center Court 2)" onChange={handleChange} required />
        <input type="datetime-local" name="time" onChange={handleChange} required />
        <input type="number" name="slots" placeholder="Total Slots" min="2" onChange={handleChange} required />
        
        <button type="submit">Create Game</button>
      </fieldset>
    </form>
  );
}

export default CreateGame;