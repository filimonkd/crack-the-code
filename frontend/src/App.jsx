import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelegramLogin from './TeleLogin';
import Dashboard from './Dashboard';
import { isAuthenticated } from '../utils/auth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated() ? <Dashboard /> : <TelegramLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
