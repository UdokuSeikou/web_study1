const express = require('express');
const path = require('path')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//静的ファイルのルートを設定
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

//サーバーを起動
app.listen(3000, ()=>{
    console.log('Server up http://localhost:3000/');
})