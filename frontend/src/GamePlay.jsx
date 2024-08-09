import React, { useState } from 'react';

const GamePlay = ({ onSubmitNumber, onSubmitGuess, feedback, gameStatus }) => {
  const [number, setNumber] = useState('');
  const [guess, setGuess] = useState('');

  const handleNumberSubmit = () => {
    onSubmitNumber(number);
  };

  const handleGuessSubmit = () => {
    onSubmitGuess(guess);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <label className="block mb-2 font-bold">Enter your 4-digit number:</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="0000"
          maxLength="4"
          className="border border-gray-300 rounded py-2 px-4 mb-2"
        />
        <button
          onClick={handleNumberSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Lock In
        </button>
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-bold">Guess the opponent's number:</label>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="0000"
          maxLength="4"
          className="border border-gray-300 rounded py-2 px-4 mb-2"
        />
        <button
          onClick={handleGuessSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Submit Guess
        </button>
      </div>

      <div className="mb-8">
        <h3 className="font-bold">Feedback:</h3>
        <p>{feedback}</p>
      </div>

      <div className="mb-8">
        <h3 className="font-bold">Game Status:</h3>
        <p>{gameStatus}</p>
      </div>
    </div>
  );
};

export default GamePlay;
