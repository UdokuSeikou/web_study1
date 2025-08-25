/*
    DBの初期化、他ファイルからの接続
*/
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

// 接続インスタンスを保持
let db;

// アプリ起動時に呼び出して接続を確立
async function initDB() {
    // DBに接続
    db = await open({
        filename: path.join(__dirname, 'db.sqlite'),
        driver: sqlite3.Database
    });

    // 必要に応じてテーブル作成
    /*
        CURRENT_TIMESTAMPはデフォルトだとイギリス時間を記録
        いつか直す
    */
    // `Users`テーブル
    await db.run(`
        CREATE TABLE IF NOT EXISTS Users(
        userId TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdTime DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    );
    // `Tasks`テーブル
    await db.run(`
        CREATE TABLE IF NOT EXISTS Tasks(
        taskId INTEGER PRIMARY KEY,
        userId TEXT,
        description TEXT,
        deadline DATETIME,
        status TEXT CHECK(status IN ('pending', 'in_progress', 'completed', 'canceled'))
                DEFAULT 'pending',
        createdTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        updateTime DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    );

    // 接続結果を返す
    return db;
}

// 他のファイルから db を使えるように
function getDB(){
    if(!db){
        throw new Error(`DB not initialized. Call initDB() first.`);
    }
    return db;
}

module.exports = { initDB, getDB };