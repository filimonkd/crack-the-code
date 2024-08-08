const express = require('express');
const { telegramAuth } = require('../controllers/authController');

const router = express.Router();

router.get('/telegram', telegramAuth);

module.exports = router;
