const express = require('express');
const router = express.Router();

//コンテンツ取得
router.get('/', (req, res) => {
    res.json({
        title : 'Hello API',
        message: 'Welcome to the API!'
    });
});

module.exports = router;