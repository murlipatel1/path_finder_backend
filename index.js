const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');

//Default port 3000
PORT = 3000 || process.env.PORT;

db.then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app = express();


app.use(bodyParser.json());

// app.use('/locations', require('./routes/locations'));
app.use('/', require('./routes/roads'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;