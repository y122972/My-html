const express = require('express')
const router = express.Router()
const db = require('../models/database')

module.exports=router

router.get('/getArticleList', (req, res) => {
    console.log('getList: ' + req.query.page + ',' + req.query.pageSize,req.query.msg,req.query.option)
    if(req.query.msg&&req.query.option){
        let titleLike=`%${req.query.msg}%`,contentLike=`%${req.query.msg}%`,labelLike=`%${req.query.msg}%`
        if(req.query.option=='title'){
            contentLike=null
            labelLike=null
            console.log('title',titleLike,contentLike)
        } else if(req.query.option=='content'){
            titleLike=null
            labelLike=null
            console.log('content',titleLike,contentLike)
        } else if(req.query.option=='label'){
            titleLike=null
            contentLike=null
            console.log('label',titleLike,contentLike)
        }
        db.query('select id,title,front,time,label from article where deleted=0 and (title like ? or content like ? or label like ?) order by time DESC limit ?,?;select count(*) as total from article where deleted=0 and (title like ? or content like ? or label like ?)', [titleLike,contentLike,labelLike,req.query.page * req.query.pageSize - 0, req.query.pageSize - 0,titleLike,contentLike,labelLike], rows => {
            res.send(rows)
        })
    } else {
        db.query('select id,title,front,time,label from article where deleted=0 order by time DESC limit ?,?;select count(*) as total from article where deleted=0', [req.query.page * req.query.pageSize - 0, req.query.pageSize - 0], rows => {
            res.send(rows)
        })
    }
    
})
  
router.get('/getArticle', (req, res) => {
    console.log('getArticle: id = ' + req.query.id)
    db.query('select * from article where id = ?', [req.query.id - 0], rows => {
        res.send(rows)
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
