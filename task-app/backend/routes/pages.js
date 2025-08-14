/*
    ページの基本的なルーティングを行う
*/
const express = require('express');
const router = express.Router();

// ホームページのルート
router.get('/', (req, res) => {
    if(req.session.userId){    // ログインの有無をuserIdで確認
        res.redirect('/tasks'); // タスク管理のページに移動
    } else{
        res.redirect('/login'); // ログインページに移動
    }
});

module.exports = { router };