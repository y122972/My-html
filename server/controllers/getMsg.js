const express = require('express')
const router = express.Router()
const db = require('../models/database')

module.exports=router

router.get('/getArticleList', (req, res) => {
    console.log('getList: ' + req.query.page + ',' + req.query.pageSize)
    db.query('select id,title,front,time,label from article where deleted=0 order by time DESC limit ?,?;select count(*) as total from article where deleted=0', [req.query.page * req.query.pageSize - 0, req.query.pageSize - 0], rows => {
        res.send(rows)
    })
})
  
router.get('/getArticle', (req, res) => {
    console.log('getArticle: id = ' + req.query.id)
    db.query('select * from article where id = ?', [req.query.id - 0], rows => {
        res.send(rows)
    })
})
  
router.get('/getComment', (req, res) => {
    console.log('get comment: article id = ' + req.query.articleId, req.query.page, req.query.pageSize)
    db.query('select * from comment where articleId = ? and deleted=0 order by floor limit ?,?;select count(*) as total from comment where deleted=0 and articleId=?', [req.query.articleId - 0, req.query.page * req.query.pageSize - 0, req.query.pageSize - 0, req.query.articleId], rows => {
        res.send(rows)
    })
})
  
router.get('/addComment', (req, res) => {
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

router.get('/getNav', function (req, res) {
    console.log('getNav')
    db.query('select * from navigation', [], rows => {
        console.log(req.session.sessionid,'sessionid')
        if(req.session.sessionid){
            rows.push({
                name: 'AddArticle',
                link: '/addArticle'
            })
        }
        res.send(rows)
    })

});
  
  
router.get('/getLinks', function (req, res) {
    console.log('getLinks')
    db.query('select * from links', [], rows => {
        
        res.send(rows)
    })

});
