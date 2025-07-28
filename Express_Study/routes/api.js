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

router.get('/:id', async function(req, res) {
    const db = await openDB();
    const id = await req.params.id;
    const data = await db.get('SELECT * FROM personaldata WHERE id = ?', id);
    
    if (data) {
        res.json({row:data});
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

router.post('/add', async function(req, res) {
    const name = req.body.name;
    const email = req.body.email;

    const db = await openDB();
    const result = await db.run('INSERT INTO personaldata (name, email) VALUES (?, ?)', name, email);
    
    res.json({
        result:result
    });
});

router.post('/edit', async (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    const db = await openDB();
    let sql = 'UPDATE personaldata SET name = ?, email = ? WHERE id = ?';
    let result = await db.run(sql, name, email, id);
    res.json({
        result: result
    });
});

router.post('/delete', async (req, res) => {
    let id = req.body.id;
    const db = await openDB();
    let sql = 'DELETE FROM personaldata WHERE id = ?';
    const result = await db.run(sql, id);
    res.json({
        result: result
    });
});

module.exports = router;