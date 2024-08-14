const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let games = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    const { type, gameId, playerId, data } = parsedMessage;

    console.log(
      `Received message of type ${type} from ${playerId} in game ${gameId}`
    );

    switch (type) {
      case "createGame":
        games[gameId] = { player1: playerId, player2: null, code1: null, code2: null };
        console.log(`Game ${gameId} created by ${playerId}`);
        break;

      case "joinGame":
        if (games[gameId]) {
          if (!games[gameId].player2) {
            games[gameId].player2 = playerId;
            console.log(`Player ${playerId} joined game ${gameId} as player2`);
          } else {
            ws.send(JSON.stringify({ type: "error", message: "Game is full" }));
            console.log(`Game ${gameId} is full. ${playerId} could not join.`);
          }
        } else {
          ws.send(JSON.stringify({ type: "error", message: "Game does not exist" }));
          console.log(`Game ${gameId} does not exist`);
        }
        break;

      case "lockIn":
        if (games[gameId]) {
          if (games[gameId].player1 === playerId) {
            games[gameId].code1 = data.code;
            console.log(`Player 1 (${playerId}) locked in code for game ${gameId}`);
          } else if (games[gameId].player2 === playerId) {
            games[gameId].code2 = data.code;
            console.log(`Player 2 (${playerId}) locked in code for game ${gameId}`);
          } else {
            ws.send(JSON.stringify({ type: "error", message: "Player not recognized in this game" }));
            console.log(`Player ${playerId} is not recognized in game ${gameId}`);
          }
        } else {
          ws.send(JSON.stringify({ type: "error", message: "Game does not exist" }));
          console.log(`Game ${gameId} does not exist`);
        }
        break;

      case "guess":
        if (games[gameId]) {
          let opponentCode = games[gameId].player1 === playerId ? games[gameId].code2 : games[gameId].code1;

          if (!opponentCode) {
            ws.send(JSON.stringify({ type: "error", message: "Opponent's code is not locked in yet" }));
            console.log(`Opponent's code is not locked in for game ${gameId}`);
            return;
          }

          const feedback = evaluateGuess(data.guess, opponentCode);
          const winner = feedback === "Perfect match!" ? playerId : null;

          console.log(
            `Player ${playerId} guessed ${data.guess} in game ${gameId}. Feedback: ${feedback}`
          );

          // Send feedback to the guessing player
          ws.send(
            JSON.stringify({
              type: "feedback",
              gameId,
              playerId,
              data: { feedback, winner },
            })
          );

          // Notify the opponent if there is a winner
          if (winner) {
            console.log(`Player ${playerId} won game ${gameId}`);
            wss.clients.forEach(client => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: "result",
                  gameId,
                  data: { winner: playerId }
                }));
              }
            });
          }
        } else {
          ws.send(JSON.stringify({ type: "error", message: "Game does not exist" }));
          console.log(`Game ${gameId} does not exist`);
        }
        break;

      default:
        console.log("Unknown message type:", type);
    }
  });
});

function evaluateGuess(guess, code) {
  if (guess === code) {
    return "Perfect match!";
  }
  // Add more detailed evaluation logic here
  return "Some feedback message";
}

module.exports = wss;
