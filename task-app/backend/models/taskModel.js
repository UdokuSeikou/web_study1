/*
    タスク関連のDB操作
*/
const { getDB } = require('../db/indexDB');

//新しいタスクを作成
async function createTask({ userId, description, deadline}) {
    db = getDB();
    try{
        // Taskを挿入するSQLクエリ
        const query = `INSERT INTO Tasks
            (userId, description, deadline)
            VALUES (?, ?, ?)
        `;
        // クエリを実行してタスクを追加
        return await db.run(query, userId, description, deadline);
    } catch (err){
        console.error(err);
    }
}

// 指定されたユーザーIDの全タスクを取得
async function getTaskByUserId({userId}) {
    const db = getDB();
    try{
        // Taskを検索するSQLクエリ、締め切りの順で並べる
        const query = `
            SELECT * FROM Tasks
            WHERE userId = ?
            ORDER BY deadline DESC
        `;
        // クエリを実行してタスクを取得
        return await db.all(query, userId);
    } catch (err){
        console.error(err);
    }
}

// 指定されたユーザーIDとステータスのタスクを取得
async function getTaskByUserIdAndStatus({userId, status}) {
    const db = getDB();
    try{
        // Taskを検索するクエリ
        const query = `
            SELECT * FROM Tasks
            WHERE userId = ?,
                  status = ?
        `;
        return await db.all(query, userId, status);
    } catch (err){
        console.error(err);
    }
}

// 指定されたタスクIDの内容を更新
async function updateTaskByTaskId({taskId, description, deadline}) {
    const db = getDB();
    try{
        //Taskを更新するクエリ
        const query = `
            UPDATE Tasks
            SET description = ?,
                deadline = ?,
                updateTime = CURRENT_TIMESTAMP
            WHERE taskId = ?
        `;
        // クエリを実行してタスクを更新
        // return await db.run(query, description, deadline, taskId);
        const result = await db.run(query, description, deadline, taskId);
        console.log(result);
        return result;

    } catch (err){
        console.error(err);
    }
}

// 指定されたタスクIDのステータスを更新
async function updateStatusByTaskId({taskId, status}) {
    const db = getDB();
    try{
        // statusを更新するクエリ
        const query = `
            UPDATE Tasks
            SET status = ?,
                updateTime = CURRENT_TIMESTAMP
            WHERE taskId = ?
        `;
        // クエリを実行してタスクを更新
        // return await db.run(query, status, taskId);
        const result = await db.run(query, status, taskId);
        console.log(result);
        return result;
    } catch (err){
        console.error(err);
    }
}

// 指定されたタスクIDのタスクを削除
async function deleteTaskByTaskId({taskId}) {
    const db = getDB();
    try{
        //Taskを削除するクエリ
        const query = `
            DELETE FROM Tasks
            WHERE taskId = ?
        `;
        // クエリを実行してタスクを削除
        return await db.run(query, taskId);
    } catch (err){
        console.error(err)
    }
}

// 指定されたユーザーIDと紐づいたすべてのタスクを削除
async function deleteTaskByUserId({userId}) {
    const db = getDB();
    try{
        //Taskを削除するクエリ
        const query = `
            DELETE FROM Task
            WHERE userId = ?
        `;
        // クエリを実行してタスクを削除
        return await db.run(query, userId);
    } catch (err){
        console.error(err);
    }
}

module.exports = {
    createTask,
    getTaskByUserId,
    getTaskByUserIdAndStatus,
    updateTaskByTaskId,
    updateStatusByTaskId,
    deleteTaskByTaskId,
    deleteTaskByUserId
};