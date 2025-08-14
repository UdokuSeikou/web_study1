/*
    タスク管理関連のAPI
*/
const express = require('express');
const router = express.Router();
const Task = require('../../models/taskModel');

// 新しいタスクを作成するAPI
router.post('/new', async(req, res) => {
    // reqのボディからタスクの説明と期限を取得
    const {description, deadline} = req.body;
    const userId = req.session.userId
    try{
        await Task.createTask({userId, description, deadline});
        res.status(201).json({message: 'タスクが追加されました'});
    } catch (err){
        res.status(500).json({error: 'タスクの追加に失敗しました'});
    }
});

// userIdに基づいてtaskを取得
router.post('/', async(req, res) =>{
    const userId = req.session.userId;
    try{
        const tasks = await Task.getTaskByUserId({userId});
        return res.status(201).json({tasks});
    } catch(err){
        res.status(500).json({error: 'タスクの取得に失敗しました'});
    }
});

// 指定されたstatusのtaskを取得
router.post('/:status', async(req, res) => {
    const userId = req.session.userId;
    const status = req.params.status;
    try{
        const taskByStatus = await Task.getTaskByUserIdAndStatus({userId, status});
        return res.status(201).json({taskByStatus});
    } catch (err){
        res.status(500).json({error: 'タスクの取得に失敗しました'});
    }
});

// // 指定されたtaskIdの内容を更新
// router.post('/:taskId/edit', async(req, res) => {
//     const userId = req.session.userId;

// });

module.exports = router;