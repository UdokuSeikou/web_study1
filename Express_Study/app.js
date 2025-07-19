const express = require('express');
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// //ルートの設定
// app.get('/',(req, res)=>{
//     res.send('Express!');
// });

//サーバーを起動
app.listen(3000, ()=>{
    console.log('Server up http://localhost:3000/');
})