/*
    ユーザー関連のDB操作
*/
const { getDB } = require('../db/indexDB');

// emailでユーザーを検索
// 指定されたemailに一致するユーザーデータをdbから取得
async function getUserByEmail({email}) {
    const db = getDB();
    return await db.get(`SELECT * FROM Users WHERE email = ?`, email);
}

// ユーザーIDでユーザーを検索
async function getUserByUserId({userId}) {
    const db = getDB();
    return await db.get(`SELECT * FROM Users WHERE userId = ?`, userId);
}

module.exports = { getUserByEmail, getUserByUserId };