/*
    ユーザー関連のDB操作
*/
const { getDB } = require('../db/indexDB');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function ToHashPassword (password){
    return await bcrypt.hash(password, 10);
}

// emailからユーザーを検索
// 指定されたemailに一致するユーザーデータをdbから取得
async function findUserByEmail({email}) {
    const db = getDB();
    try{
        const query = `
            SELECT * FROM Users
            WHERE email = ?
        `;
        // クエリを実行してユーザーを検索
        return await db.get(query, email);
    } catch (err){
        console.error(err);
        throw err;
    }
}

// userIdからユーザー情報を取得
async function getUserByUserId({userId}) {
    const db = getDB();
    try{
        const query = `
            SELECT * FROM Users
            WHERE userId = ?
        `;
        // クエリを実行してユーザー情報を取得
        return await db.get(query, userId);
    } catch (err){
        console.error(err);
        throw err;
    }
}

// ユーザーを登録
async function registerUser({username, email, password}) {
    const db =getDB();
    try{
        // ユーザー情報を登録するクエリ
        const query = `
            INSERT INTO Users
            (userId, username, email, password)
            VALUES (?, ?, ?, ?)
        `;
        // UUIDを生成し、userIdとして格納
        const userId = crypto.randomUUID();
        // パスワードをハッシュ化
        const hashPassword = await ToHashPassword(password);
        // クエリを実行してユーザーを登録
        return await db.run(query,userId, username, email, hashPassword);
    } catch (err){
        console.error(err);
        throw err;
    }
}

module.exports = { findUserByEmail, getUserByUserId, registerUser, ToHashPassword };