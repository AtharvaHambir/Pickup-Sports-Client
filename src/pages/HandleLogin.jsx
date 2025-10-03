// In client/src/pages/HandleLogin.jsx

import { useEffect, useState } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function HandleLogin() {
    const [message, setMessage] = useState('Verifying your login...');
    const navigate = useNavigate();

    useEffect(() => {
        const finalizeLogin = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    // This can happen if the user opens the link on a different device
                    email = window.prompt('Please provide your email for confirmation');
                }
                
                try {
                    await signInWithEmailLink(auth, email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                    setMessage('Login successful! Redirecting...');
                    navigate('/'); // Redirect to the dashboard
                } catch (error) {
                    console.error(error);
                    setMessage('Error logging in. The link may have expired or been used already.');
                }
            } else {
                setMessage('Invalid login link.');
            }
        };

        finalizeLogin();
    }, [navigate]);

    return (
        <article>
            <p>{message}</p>
        </article>
    );
}

export default HandleLogin;