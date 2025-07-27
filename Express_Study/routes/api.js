const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const express = require('express');
const { route } = require('./db');

const router = express.Router();

// SQLite3のデータベースに接続する関数
async function openDB() {
    return await open({
        filename: './data.sqlite3',
        driver: sqlite3.Database
    });
}

router.get('/', async function(req, res) {
    const db = await openDB();
    const data = await db.all('SELECT * FROM personaldata');
    res.json({
        rows: data
    });
});

module.exports = router;