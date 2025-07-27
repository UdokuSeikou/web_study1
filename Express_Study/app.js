const express = require('express');
const path = require('path')
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//静的ファイルのルートを設定
app.use(express.static(path.join(__dirname, 'public')));

//URLエンコーディングの設定
app.use(express.urlencoded({extended: false}));

// JSONボディパーサーを追加
app.use(express.json());

//セッションの設定
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
}));

// http://localhost:3000/にアクセスしたときのルートハンドラ
// ./routes/indexにつなげる
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// http://localhost:3000/dbにアクセスしたときのルートハンドラ
// ./routes/dbにつなげる
const dbRouter = require('./routes/db');
app.use('/db', dbRouter);

// http://localhost:3000/apiにアクセスしたときのルートハンドラ
// ./routes/apiにつなげる
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

//サーバーを起動
app.listen(3000, ()=>{
    console.log('Server up http://localhost:3000/');
})