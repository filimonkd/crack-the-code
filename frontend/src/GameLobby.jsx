import React, { useState } from 'react';

const GameLobby = ({ onCreateGame, onJoinGame }) => {
  const [gameId, setGameId] = useState('');

  const handleJoinGame = () => {
    onJoinGame(gameId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Crack the Code</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
          className="border border-gray-300 rounded py-2 px-4 mb-2"
        />
        <button
          onClick={handleJoinGame}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Join Game
        </button>
      </div>

      <button
        onClick={onCreateGame}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Create New Game
      </button>
    </div>
  );
};

export default GameLobby;
