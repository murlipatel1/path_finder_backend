const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
// const run = require('./config/dbatlas');
const cors = require('cors');
//Default port 3000
PORT = 3000 || process.env.PORT;

// run().catch(console.dir);

db.then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});


app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./routes/roads'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
