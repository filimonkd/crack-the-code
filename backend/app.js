const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet');

dotenv.config();

const app = express();
// Use Helmet to add security headers, including CSP
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://oauth.telegram.org");
    next();
});
// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
