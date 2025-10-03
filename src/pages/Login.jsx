// In client/src/pages/Login.jsx

import { useState } from 'react';
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email.endsWith('.edu')) {
        setError('A valid .edu university email is required.');
        return;
    }

    const actionCodeSettings = {
      // THIS IS THE CORRECTED LINE: It now correctly builds the full URL
      // It should result in: https://atharvahambir.github.io/Pickup-Sports-Client/#/handle-login
      url: `${window.location.origin}${window.location.pathname}#/handle-login`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Success! A new login link has been sent to your email.');
    } catch (err) {
      console.error(err);
      setError('Failed to send login link. Please try again.');
    }
  };

  return (
    <article>
      <h2>Welcome to Pickup Play</h2>
      <p>Enter your university .edu email to receive a magic login link.</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your-name@northeastern.edu"
          required
        />
        <button type="submit">Send Login Link</button>
      </form>
      {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
      {error && <p style={{ color: 'salmon' }}>{error}</p>}
    </article>
  );
}

export default Login;