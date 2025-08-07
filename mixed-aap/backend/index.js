const express = require('express');
const app = express();

//ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//静的フォルダの設定
app.use(express.static('public'));

//APIルートハンドラの設定
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});