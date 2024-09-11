import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pastScores, setPastScores] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [targetNumber, setTargetNumber] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startNewGame();
    fetchUserData();
    fetchLeaderboard();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setShowConfetti(false);
    setScore(0);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/user-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHighScore(response.data.highScore);
      setPastScores(response.data.pastScores);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/leaderboard`);
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const updateHighScore = async () => {
    if (score > highScore) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/game/highscore`, 
          { score },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setHighScore(response.data.highScore);
        setShowConfetti(true);
      } catch (error) {
        console.error('Error updating high score:', error);
      }
    }
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number');
      return;
    }

    if (guessNumber === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${score} tries!`);
      updateHighScore();
      setTimeout(startNewGame, 5000);
    } else {
      setScore(prevScore => prevScore + 1);
      if (guessNumber < targetNumber) {
        setMessage('Too low! Try again.');
      } else {
        setMessage('Too high! Try again.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to the login or home page
  };

  return (
    <div className="game-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      {showConfetti && <Confetti />}
      
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Number Guessing Game</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Guess a number between 1 and 100</p>
      
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="w-64 px-4 py-2 mb-4 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      
      <button
        onClick={handleGuess}
        className="w-64 py-2 mb-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
      >
        Guess
      </button>
      
      <p className={`message text-lg ${message.includes('Congratulations') ? 'text-green-500' : 'text-red-500'} mb-4`}>
        {message}
      </p>
      
      <p className="text-gray-700 dark:text-gray-300 mb-2">Current Score: {score}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">High Score: {highScore}</p>
      
      <div className="w-full max-w-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Past Scores:</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {pastScores.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ul>
      </div>
      
      <div className="w-full max-w-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Leaderboard:</h3>
        <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300">
          {leaderboard.map((user, index) => (
            <li key={index}>
               {user.username} - {user.highScore}
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={startNewGame}
        className="w-64 py-2 mb-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
      >
        New Game
      </button>
      
      <button
        onClick={handleLogout}
        className="w-64 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-200 transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default Game;
