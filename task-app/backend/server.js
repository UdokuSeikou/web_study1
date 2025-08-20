const express = require('express');
const session = require('express-session');
const path = require('path');
const { initDB } = require('./db/indexDB');

const app = express();
const PORT = 5000;

//ルートハンドラの読み込み
// const pageRouter = require('./routes/page');
const userApiRouter = require('./routes/api/usersAPI');
const taskApiRouter = require('./routes/api/tasksAPI');

//ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//セッション管理の設定
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

//Reactの静的ファイルの提供
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//各ルーターをバインド
// app.use('/', pageRouter);
app.use('/api/user', userApiRouter);
app.use('/api/task', isLoggedIn, taskApiRouter);

//ユーザーの認証ミドルウェア
//非ログイン状態の場合、401エラーを返す
function isLoggedIn(req, res, next){
    if (req.session.userId){ // セッションにuserIdが存在するか確認
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' }); // 存在しない場合は401エラーを返す
}

// DB初期設定・サーバー起動
initDB().then(() => {
    console.log(`DB initialized`);

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error(`DB initialized failed: `, error);
});