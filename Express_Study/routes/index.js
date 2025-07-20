const express = require('express');
const { title } = require('process');
const router = express.Router();

let data = [];

//ルートハンドラ
router.get('/', (req, res)=>{
    let opt = {
        title: 'Express',
        data: data
    }
    res.render('index', opt);
});

router.post('/', (req, res)=>{
    data.unshift(req.body.msg);
    res.redirect('/');
});

module.exports = router;