/*
    ユーザー関連のAPI
*/
const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');

//ログイン処理のルート
router.post('/login', async(req, res) => {
    // reqからEmailとusernameとpasswordを取得
    const {email, password} = req.body;
    try{
        // Emailと一致するユーザーを検索
        const user = await User.getUserByEmail({email: email});

        // passwordが一致するか確認
        if(password === user.password){
            // 一致する場合、セッションにuserIdを保存
            req.session.userId = user.userId;
            // ログイン成功のレスポンスを返す
            res.status(200).json({message: 'ログインに成功しました'});
        } else{
            res.status(400).json({error: 'メールアドレス, またはパスワードが間違っています'});
        }
    } catch (err){
        res.status(500).json({error: 'ログインに失敗しました'})
    }
});

//ログアウト処理のルート
router.post('/logout', (req, res) => {
    // セッションを放棄してログアウト処理を行う
    req.session.destroy(err => {
        if(err){
            // 失敗時はエラーを返す
            return res.status(500).json({error: 'ログアウトに失敗しました'});
        }
        res.status(200).json({message: 'ログアウトに成功しました'})
    })
});

module.exports = router;