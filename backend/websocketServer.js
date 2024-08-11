const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let games = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const { type, gameId, playerId, data } = parsedMessage;

    switch (type) {
      case 'createGame':
        games[gameId] = { player1: playerId, player2: null, code: null };
        break;

      case 'joinGame':
        if (games[gameId]) {
          games[gameId].player2 = playerId;
        }
        break;

      case 'lockIn':
        if (games[gameId]) {
          games[gameId].code = data.code;
        }
        break;

      case 'guess':
        if (games[gameId]) {
          const feedback = evaluateGuess(data.guess, games[gameId].code);
          const winner = feedback === 'Perfect match!' ? playerId : null;

          // Send feedback to both players
          ws.send(JSON.stringify({ type: 'feedback', gameId, playerId, data: { feedback, winner } }));
        }
        break;

      default:
        console.log('Unknown message type:', type);
    }
  });
});

function evaluateGuess(guess, code) {
  // Implement your guess evaluation logic here
  return guess === code ? 'Perfect match!' : 'Some feedback message';
}

module.exports = wss;
