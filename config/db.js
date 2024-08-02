const mongoose = require('mongoose');

// Connect to the database
const db = mongoose.connect('mongodb://localhost:27017/pathfinder');

module.exports = db;
