import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

function GameLobby() {
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket('ws://localhost:8080');

  const handleJoinGame = () => {
    sendMessage(JSON.stringify({
      type: 'joinGame',
      gameId,
      playerId: 'player1', // This should be dynamically set based on the authenticated player
    }));
    navigate(`/game/${gameId}`);
  };

  const handleCreateGame = () => {
    const newGameId = Math.random().toString(36).substr(2, 9);
    setGameId(newGameId);
    sendMessage(JSON.stringify({
      type: 'createGame',
      gameId: newGameId,
      playerId: 'player1',
    }));
    navigate(`/game/${newGameId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Crack the Code</h1>
      <input
        type="text"
        placeholder="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={handleJoinGame} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4">
        Join Game
      </button>
      <button onClick={handleCreateGame} className="bg-green-500 text-white font-bold py-2 px-4 rounded">
        Create New Game
      </button>
    </div>
  );
}

export default GameLobby;
