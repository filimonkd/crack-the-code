import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TelegramAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hash = params.get('hash');
        const telegramData = {};

        params.forEach((value, key) => {
            if (key !== 'hash') telegramData[key] = value;
        });

        if (hash) {
            // Send the data to the backend for verification
            axios.get(`/api/auth/telegram`, { params: { ...telegramData, hash } })
                .then(response => {
                    // Store the JWT token in localStorage
                    localStorage.setItem('token', response.data.token);

                    // Redirect to the dashboard
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('Authentication failed:', error);
                });
        }
    }, [navigate]);

    return <div>Authenticating...</div>;
};

export default TelegramAuthHandler;
