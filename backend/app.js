const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http'); // Import HTTP module
const websocketServer = require('./websocketServer'); // Import WebSocket server

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Use Helmet to add security headers, including CSP
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,POST',
    credentials: true
}));
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://oauth.telegram.org");
    next();
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start the WebSocket server and integrate it with the HTTP server
websocketServer.on('connection', (ws) => {
    // WebSocket connection logic is already defined in websocketServer.js
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start HTTP server with WebSocket support
