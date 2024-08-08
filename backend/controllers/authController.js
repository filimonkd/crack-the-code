exports.telegramAuth = (req, res) => {
    const { hash, ...telegramData } = req.query;

    console.log('Received data:', telegramData);
    console.log('Received hash:', hash);

    // Verify the Telegram authentication
    const isAuthenticated = checkTelegramAuth(telegramData, hash);
    
    if (!isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Generate a JWT token
    const token = jwt.sign(telegramData, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
