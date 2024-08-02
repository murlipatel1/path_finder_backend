const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Roads api');
});

module.exports = router;