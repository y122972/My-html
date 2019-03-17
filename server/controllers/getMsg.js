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
