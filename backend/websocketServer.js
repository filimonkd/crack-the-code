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
        games[gameId] = { player1: playerId, player2: null, code: null };
        console.log(`Game ${gameId} created by ${playerId}`);
        break;

      case "joinGame":
        if (games[gameId]) {
          if (!games[gameId].player2) {
            games[gameId].player2 = playerId;
          } else if (games[gameId].player1 !== playerId) {
            ws.send(JSON.stringify({ type: "error", message: "Game is full" }));
          }
        }
        break;

      case "lockIn":
        if (games[gameId]) {
          games[gameId].code = data.code;
          console.log(`Player ${playerId} locked in code for game ${gameId}`);
        } else {
          console.log(`Game ${gameId} does not exist`);
        }
        break;

      case "guess":
        if (games[gameId]) {
          const feedback = evaluateGuess(data.guess, games[gameId].code);
          const winner = feedback === "Perfect match!" ? playerId : null;

          console.log(
            `Player ${playerId} guessed ${data.guess} in game ${gameId}. Feedback: ${feedback}`
          );

          // Send feedback to both players
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
          }
        } else {
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
  // Add logic to return meaningful feedback here
  return "Some feedback message";
}

module.exports = wss;
