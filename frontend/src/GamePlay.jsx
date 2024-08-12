import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

function GamePlay() {
  const { gameId } = useParams();
  const [playerCode, setPlayerCode] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const { sendMessage, lastJsonMessage } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (lastJsonMessage) {
      const { type, data } = lastJsonMessage;
  
      if (type === 'feedback') {
        setFeedback(data.feedback); // Update feedback state
      } else if (type === 'result') {
        setWinner(data.winner); // Update winner state
        navigate('/result'); // Navigate to result screen
      }
    }
  }, [lastJsonMessage, navigate]);
  

  const handleLockIn = () => {
    if (playerCode.length !== 4) {
      alert('Please enter a valid 4-digit code!');
      return;
    }
    sendMessage(JSON.stringify({
      type: 'lockIn',
      gameId,
      playerId: 'player1',
      data: { code: playerCode },
    }));
    alert('Your code is locked in!');
  };

  const handleGuess = () => {
    if (guess.length !== 4) {
      alert('Please enter a valid 4-digit guess!');
      return;
    }
    sendMessage(JSON.stringify({
      type: 'guess',
      gameId,
      playerId: 'player2',
      data: { guess },
    }));
    setAttempts(attempts + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Game ID: {gameId}</h2>
      {!winner && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Enter your 4-digit number</label>
            <input
              type="text"
              value={playerCode}
              onChange={(e) => setPlayerCode(e.target.value)}
              className="p-2 border rounded"
            />
            <button onClick={handleLockIn} className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4">
              Lock In
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Guess the opponent's number</label>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 border rounded"
            />
            <button onClick={handleGuess} className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-4">
              Submit Guess
            </button>
          </div>
          <div className="mb-4">
            <p>{feedback}</p>
            <p>Attempts: {attempts}</p>
          </div>
        </>
      )}
      {winner && (
        <div className="text-2xl font-bold">
          <p>{winner} wins!</p>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
