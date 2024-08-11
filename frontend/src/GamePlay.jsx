import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GamePlay() {
  const navigate = useNavigate();
  const [playerCode, setPlayerCode] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [winner, setWinner] = useState(null);
  const maxAttempts = 10; // Maximum number of guesses

  useEffect(() => {
    if (winner) {
      navigate("/result", { state: { winner } });
    }
  }, [winner, navigate]);

  const generateSecretCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const evaluateGuess = (guess, code) => {
    let perfectMatches = 0;
    let closeMatches = 0;
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === code[i]) {
        perfectMatches++;
      } else if (code.includes(guess[i])) {
        closeMatches++;
      }
    }
    if (perfectMatches === 4) return "Perfect match!";
    return `${perfectMatches} digits correct, ${closeMatches} in the right position`;
  };

  const handleLockIn = () => {
    if (playerCode.length !== 4) {
      alert("Please enter a valid 4-digit code!");
      return;
    }
    setPlayerCode(generateSecretCode()); // Generate code for Player 1
    alert("Your code is locked in!");
  };

  const handleGuess = () => {
    if (guess.length !== 4) {
      alert("Please enter a valid 4-digit guess!");
      return;
    }
    const result = evaluateGuess(guess, playerCode);
    setFeedback(result);
    setAttempts(attempts + 1);

    if (result === "Perfect match!") {
      setWinner("Player 2");
    } else if (attempts + 1 === maxAttempts) {
      setWinner("Player 1");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <label>Enter your 4-digit code:</label>
        <input
          type="text"
          value={playerCode}
          onChange={(e) => setPlayerCode(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleLockIn}
          className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Lock In
        </button>
      </div>

      <div className="mb-4">
        <label>Guess the opponent's number:</label>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleGuess}
          className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Submit Guess
        </button>
      </div>

      <div className="mb-4">
        <p>Feedback: {feedback}</p>
      </div>

      <div className="mb-4">
        <p>Attempts: {attempts}/{maxAttempts}</p>
      </div>
    </div>
  );
}

export default GamePlay;
