const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const db = require('./models/database')

app.use(express.static('www'));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});
app.get('/getNav', function (req, res) {
  console.log('getNav')
  db.query('select * from navigation', [], rows => {
    res.send(rows)
  })

});
app.get('/getLinks', function (req, res) {
  console.log('getLinks')
  db.query('select * from links', [], rows => {
    res.send(rows)
  })

});
app.get('/uploadArticle', function (req, res) {
  let mtd = ''
  if (req.query.id == '') {
    //没传id，表示新上传
    console.log(`upload: id=${req.query.id},title=${req.query.title}`)
    db.query('insert into article values(?,?,?,?,?,?,?,?)', [null, req.query.title, req.query.front, req.query.content, req.query.author, req.query.time, req.query.label, 0], rows => {
      res.json({
        msg: '上传成功！',
        err: 0,
        id: rows.insertId
      })
    })

  } else {
    //修改
    console.log(`update: id=${req.query.id}`)
    db.query('update article set title=?,front=?,content=?,time=?,label=? where id = ?', [req.query.title, req.query.front, req.query.content, req.query.time, req.query.lebel, req.query.id - 0], rows => {
      res.json({
        msg: '更新成功！',
        err: 0,
        id: req.query.id
      })
    })
  }
});
app.get('/getArticleList', (req, res) => {
  console.log('getList: ' + req.query.page + ',' + req.query.pageSize)
  db.query('select id,title,front,time,label from article where deleted=0 order by time DESC limit ?,?;select count(*) as total from article where deleted=0', [req.query.page * req.query.pageSize - 0, req.query.pageSize - 0], rows => {
    res.send(rows)
  })
})
app.get('/getArticle', (req, res) => {
  console.log('getArticle: id = ' + req.query.id)
  db.query('select * from article where id = ?', [req.query.id - 0], rows => {
    res.send(rows)
  })
})
app.get('/delArticle', (req, res) => {
  console.log('delect: id = ' + req.query.id)
  db.query('update article set deleted=1 where id=?', [req.query.id - 0], rows => {
    res.json({
      msg: '删除成功！',
      err: 0
    })
  })
})
app.get('/getComment', (req, res) => {
  console.log('get comment: article id = ' + req.query.articleId, req.query.page, req.query.pageSize)
  db.query('select * from comment where articleId = ? and deleted=0 order by floor limit ?,?;select count(*) as total from comment where deleted=0 and articleId=?', [req.query.articleId - 0, req.query.page * req.query.pageSize - 0, req.query.pageSize - 0, req.query.articleId], rows => {
    res.send(rows)
  })
})
app.get('/addComment', (req, res) => {
  console.log('add comment: ', req.query.content, ',', req.query.articleId)
  db.query('select MAX(floor) as maxFloor from comment where articleId = ?', [req.query.articleId], rows => {
    console.log(rows[0].maxFloor)
    db.query('insert into comment values (?,?,?,?,?,?,?,?,?)', [null, req.query.articleId, req.query.content, req.ip, req.query.time, rows[0].maxFloor === null ? 0 : rows[0].maxFloor + 1, req.query.reply - 0, 0, 0], rowss => {
      console.log(rows[0].maxFloor, rows[0].maxFloor === null ? 0 : rows[0].maxFloor + 1, 'fffff')
      res.json({
        msg: '评论成功！',
        err: 0
      })
    })
  })
})
const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
