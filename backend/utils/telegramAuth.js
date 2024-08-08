const crypto = require('crypto');

exports.checkTelegramAuth = (data, hash) => {
    const secret = crypto.createHash('sha256').update(process.env.TELEGRAM_BOT_TOKEN).digest();
    const checkString = Object.keys(data)
        .sort()
        .map((key) => (`${key}=${data[key]}`))
        .join('\n');
    
    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    
    // Debugging output
    console.log('Check String:', checkString);
    console.log('Generated HMAC:', hmac);
    console.log('Received Hash:', hash);

    return hmac === hash;
};
