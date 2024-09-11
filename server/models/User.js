const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pastScores: [Number], // Array to store past scores
  highScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
