const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

//データベースの初期化
async function initializeDB() {
    //接続
    const db = await open({
        filename: './data.sqlite3',
        driver: sqlite3.Database
    });

    //テーブルの作成
    await db.exec(`
        CREATE TABLE personaldata (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT
        );
    `);

    //シードの追加
    await seed(db);
    await db.close();
}

async function seed(db) {
    //シード
    const seedData = [
        {name: 'Alice', email: 'Arice@Oyama'},
        {name: 'Bob', email: 'Bob@Oyama'},
        {name: 'Charlie', email: 'Charlie@Oyama'},
        {name: 'David', email: 'David@Oyama'},
    ];

    //シードの追加
    for (const data of seedData) {
        await db.run('INSERT INTO personaldata (name, email) VALUES (?, ?)', [data.name, data.email]);
    }
}

initializeDB().then(() => {
    console.log('Created personaldata table.');
}).catch((err) => {
    console.error('Error initializing database:', err);
});