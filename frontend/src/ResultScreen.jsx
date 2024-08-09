import React from 'react';

const ResultScreen = ({ winner, onPlayAgain }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">
        {winner ? `Player ${winner} wins!` : "It's a tie!"}
      </h1>
      
      <button
        onClick={onPlayAgain}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultScreen;
