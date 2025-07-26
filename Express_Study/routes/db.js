const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const express = require('express');
const router = express.Router();

//SQLite3のデータベースを作成する関数
async function createDB() {
    return await open({
        filename: './data.sqlite3',
        driver: sqlite3.Database
    });
}

//ルートハンドラ
router.get('/', async function(req, res) {
    const db = await createDB();
    db.all('SELECT * FROM personaldata').then((data, err) => {
        if (err) {
            console.error(err);
            return;
        }
        let opt = {
            title: "SQLite3",
            data: data
        };
        res.render('db', opt);
    });
});

module.exports = router;