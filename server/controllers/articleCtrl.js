const express=require('express')
const path=require('path')
const router=express.Router()
const db = require('../models/database')

module.exports=router

router.post('/uploadArticle', function (req, res) {
    let mtd = ''
    if (req.body.id == '') {
        //没传id，表示新上传
        console.log(`upload: id=${req.body.id},title=${req.body.title}`)
        db.query('insert into article values(?,?,?,?,?,?,?,?)', [null, req.body.title, req.body.front, req.body.content, req.body.author, req.body.time, req.body.label, 0], rows => {
            res.json({
            msg: '上传成功！',
            err: 0,
            id: rows.insertId
            })
        })
    } else {
        //修改
        console.log(`update: id=${req.body.id}`)
        db.query('update article set title=?,front=?,content=?,time=?,label=? where id = ?', [req.body.title, req.body.front, req.body.content, req.body.time, req.body.lebel, req.body.id - 0], rows => {
            res.json({
            msg: '更新成功！',
            err: 0,
            id: req.body.id
            })
        })
    }
  });
router.get('/delArticle', (req, res) => {
    console.log('delect: id = ' + req.query.id)
    db.query('update article set deleted=1 where id=?', [req.query.id - 0], rows => {
        res.json({
            msg: '删除成功！',
            err: 0
        })
    })
})