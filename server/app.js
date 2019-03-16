const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const db = require('./models/database')
const session = require('express-session')

const articleCtrlRouter = require('./controllers/articleCtrl')
const getMsgRouter = require('./controllers/getMsg')
const loginRouter = require('./controllers/loginCtrl')

const bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.use(session({
  secret :  'aiss', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 60 * 24 * 30, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use(express.static('www'));


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});



app.use('/',getMsgRouter)

app.use('/',loginRouter)

app.use('/',articleCtrlRouter)


const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
