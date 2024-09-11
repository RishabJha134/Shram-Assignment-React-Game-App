import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      setUsername("");
      setPassword("");
      navigate('/game');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 animate-fade-in w-full">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>
      {error && <p className="text-red-500 text-sm font-medium text-center mb-2">{error}</p>}
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
