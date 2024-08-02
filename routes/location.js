const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Location api');
});

module.exports = router;