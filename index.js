const express = require('express');
const bodyParser = require('body-parser');
PORT = 3000 || process.env.PORT;

app = express();


app.use(bodyParser.json());

app.use('/location', require('./routes/location'));
app.use('/roads', require('./routes/roads'));

app.get('/', (req, res) => {
    res.send('Path Finder api');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;