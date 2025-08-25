/*
    ユーザー関連のAPI
*/
const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');

const NUM_OF_CHAR_PASSWORD = 5;

// ユーザー登録のルート
router.post('/register', async(req, res) => {
    // reqからemail, username, passwordを取得
    const {username, email, password} = req.body;
    if(!username || !email ||!password){
        return res.status(500).json({error: '入力値が足りていません'});
    }
    // passwordの文字数が足りているか
    if(password.length < NUM_OF_CHAR_PASSWORD){
        return res.status(500).json({error: 'パスワードの文字数が足りません'});
    }
    try{
        await User.registerUser({username, email, password});
        res.status(200).json({message: 'ユーザー登録に成功しました'});
    } catch (err){
        res.status(500).json({error: 'ユーザー登録に失敗しました'});
    }
});

//ログイン処理のルート
router.post('/login', async(req, res) => {
    // reqからEmailとusernameとpasswordを取得
    const {email, password} = req.body;
    try{
        // Emailと一致するユーザーの情報を検索
        const user = await User.findUserByEmail({email: email});
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            // 一致する場合、セッションにuserIdを保存
            req.session.userId = user.userId;
            // ログイン成功のレスポンスを返す
            res.status(200).json({message: 'ログインに成功しました'});
        } else{
            res.status(400).json({error: 'メールアドレス, またはパスワードが間違っています'});
        }
    } catch (err){
        res.status(500).json({error: 'ログインに失敗しました: ', err});
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