const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const express = require('express');
const router = express.Router();

//ルートハンドラ
router.get('/', async function(req, res) {
        let opt = {
            title: "SQLite3",
            message: "PersonalDataの内容を表示",
        };
        res.render('db', opt);
});

// /rowにアクセスしたときのルートハンドラ
router.get('/row', async function(req, res) {
    let opt = {
        title: "SQLite3",
        message: "レコードを表示",
    };
    res.render('row', opt);
});

// /addにアクセスしたときのルートハンドラ
router.get('/add', async function(req, res) {
    let opt = {
        title: "SQLite3",
        message: "レコードを追加",
    };
    res.render('add', opt);
});

// /editにアクセスしたときのルートハンドラ
router.get('/edit', async function(req, res) {
    let opt = {
        title: "SQLite3",
        message: "レコードを編集",
    };
    res.render('edit', opt);
});

// /deleteにアクセスしたときのルートハンドラ
router.get('/delete', async function (req, res) {
    let opt = {
        title: "SQLite3",
        message: "レコードを削除",
    };
    res.render('delete', opt);
});

module.exports = router;