const express = require('express');
const { title } = require('process');
const router = express.Router();

//ルートハンドラ
router.get('/', (req, res)=>{
    if (req.session.data == undefined){
        req.session.data = [];
        console.log('Created req.session.data!')
    }
    let opt = {
        title: "Hello!",
        data: req.session.data
    }
    res.render('index', opt);
});

router.post('/', (req, res)=>{
    req.session.data.unshift(req.body.msg);
    res.redirect('/');
});

module.exports = router;