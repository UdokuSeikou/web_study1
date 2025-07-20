const express = require('express');
const { title } = require('process');
const router = express.Router();

//ルートハンドラ
router.get('/', (req, res)=>{
    let opt = {
        title: 'Express',
        message: 'フォームを入力'
    }
    res.render('index', opt);
});

router.post('/', (req, res)=>{
    let name = req.body.username;
    let pass = req.body.pass;
    let msg = 'name: ' + name + ', password: ' + pass;
    let opt = {
        title: 'Express',
        message: msg
    }
    res.render('index', opt);
});

module.exports = router;