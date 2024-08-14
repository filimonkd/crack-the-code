import React from 'react';
import PropTypes from 'prop-types';

const ResultScreen = ({ winner, onPlayAgain }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        {winner ? `🎉 Player ${winner} wins! 🎉` : "🤝 It's a tie! 🤝"}
      </h1>
      <p className="text-lg mb-4">
        {winner ? "Congratulations on your victory!" : "Great game! Let's see who wins next time."}
      </p>
      <button
        onClick={onPlayAgain}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
      >
        Play Again
      </button>
    </div>
  );
};

// PropTypes for better prop validation
ResultScreen.propTypes = {
  winner: PropTypes.string,
  onPlayAgain: PropTypes.func.isRequired,
};

export default ResultScreen;
