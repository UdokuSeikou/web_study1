/*
    初期データ挿入スクリプト
*/
const { initDB } = require('./indexDB');

// 即時実行関数でdbに接続
(async () => {
    // dbに接続
    const db = await initDB();

    // `user1`が存在するか確認
    const userExist = await db.get(`SELECT * FROM Users WHERE username = ?`, ['user1']);

    // 存在しない場合はユーザーを追加
    if (!userExist) {
        const query = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;

        // seedデータを挿入
        await db.run(query, ['user1', 'user1@mail', 'password1']);
        await db.run(query, ['user2', 'user2@mail', 'password2']);
        await db.run(query, ['user3', 'user3@mail', 'password3']);
        await db.run(query, ['user4', 'user4@mail', 'password4']);
        console.log('Seeding complete');

    } else{
        console.error('User data already exists.')
    }


})();
