// In client/src/pages/Login.jsx

import { useState } from 'react';
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from '../firebase'; // Import our auth instance

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

    // This object tells Firebase where to redirect the user after they click the link
    const actionCodeSettings = {
      url: `${window.location.origin}/handle-login`, // URL must be whitelisted in Firebase console
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email to local storage to use it after redirection
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Success! A login link has been sent to your email.');
    } catch (err) {
      console.error(err);
      setError('Failed to send login link. Please try again.');
    }
  };

  return (
    <article>
      <h2>Welcome to Pickup Sports</h2>
      <p>Enter your university .edu email to receive the login link.</p>
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