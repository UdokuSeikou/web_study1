/*
    タスク管理関連のAPI
*/
const express = require('express');
const router = express.Router();
const Task = require('../../models/taskModel');

// userIdに基づいてtaskを取得
router.get('/', async(req, res) =>{
    const userId = req.session.userId;
    try{
        const tasks = await Task.getTaskByUserId({userId});
        return res.status(201).json({tasks});
    } catch(err){
        res.status(500).json({error: `タスクの取得に失敗しました`});
    }
});

// 新しいタスクを作成するAPI
router.post('/new', async(req, res) => {
    // reqのボディからタスクの説明と期限を取得
    const {description, deadline} = req.body;
    const userId = req.session.userId
    // 不正な入力でないか確認
    if (!description || !deadline){
        return res.status(400).json({error: `パラメータが不正です`});
    }
    try{
        await Task.createTask({userId, description, deadline});
        res.status(201).json({message: `タスクが追加されました`});
    } catch (err){
        res.status(500).json({error: `タスクの追加に失敗しました`});
    }
});

// 指定されたstatusのtaskを取得
router.get('/:status', async(req, res) => {
    const userId = req.session.userId;
    const status = req.params.status;
    try{
        const taskByStatus = await Task.getTaskByUserIdAndStatus({userId, status});
        return res.status(201).json({taskByStatus});
    } catch (err){
        res.status(500).json({error: `タスクの取得に失敗しました`});
    }
});

// 指定されたtaskIdの内容を更新
router.patch('/:taskId/edit', async(req, res) => {
    const userId = req.session.userId;
    const taskId = req.params.taskId;
    const { description, deadline } = req.body;
    // 不正な入力でないか確認
    if (!description || !deadline){
        return res.status(400).json({error: `パラメータが不正です`});
    }
    try{
        await Task.updateTaskByTaskId({ taskId, description, deadline});
        res.status(201).json({message: `タスクを更新しました`});
    } catch (err){
        res.status(500).json({error: `タスクの更新に失敗しました`});
    }
});

// 指定されたtaskIdのstatusを更新
router.patch('/:taskId/status', async(req, res) => {
    const taskId = req.params.taskId;
    const status = req.body.status;
    // 不正な入力でないか確認
    if (!status){
        return res.status(400).json({error: `パラメータが不正です`});
    }
    try{
        await Task.updateStatusByTaskId({ taskId, status });
        res.status(201).json({message: `ステータスを更新しました`});
    } catch (err){
        res.status(500).json({error: `ステータスの更新に失敗しました`});
    }
});

module.exports = router;