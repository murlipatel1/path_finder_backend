const mongoose = require('mongoose');

// Connect to the database
const db = mongoose.connect('mongodb://localhost:27017/pathfinder');
// const db = mongoose.connect('mongodb+srv://murlipatel28:<password>@cluster0.6fbas09.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
module.exports = db;
