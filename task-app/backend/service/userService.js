/*
    ユーザー関連のアプリ依存ルール
*/
const User = require('../models/userModel');
const NUM_OF_CHAR_PASSWORD = 5;

// ユーザー登録のバリデーション
async function addUser({username, email, password}) {
    // 未登録のEmailか確認
    const user = await User.findUserByEmail({email: email});
    
}
