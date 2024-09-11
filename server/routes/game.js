const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to get leaderboard (top 10 high scores)
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find()
      .sort({ highScore: -1 }) // Sort users by highScore in descending order
      .limit(10); // Get top 10 users
    
    const leaderboard = users.map(user => ({
      username: user.username,
      highScore: user.highScore
    }));

    res.json({ leaderboard });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch leaderboard' });
  }
});


// Route to get user data including past scores
router.get('/user-data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ highScore: user.highScore, pastScores: user.pastScores });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user data' });
  }
});

// Route to get high score
router.get('/highscore', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ highScore: user.highScore });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch high score' });
  }
});

// Route to update high score
router.post('/highscore', auth, async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.userId);

    // Add current score to past scores
    user.pastScores.push(score);

    // Update high score if necessary
    if (score > user.highScore) {
      user.highScore = score;
    }

    await user.save();
    res.json({ highScore: user.highScore });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update high score' });
  }
});

module.exports = router;
