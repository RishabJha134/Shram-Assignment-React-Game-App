import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;