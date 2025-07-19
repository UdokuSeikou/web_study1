const express = require('express');
const { title } = require('process');
const router = express.Router();

//ルートハンドラ
router.get('/', (req, res)=>{
    const data = {
        title: 'Express-app',
        message: 'これはサンプル'
    };
    res.render('index', data);
});

module.exports = router;