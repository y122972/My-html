const express = require('express')
const router = express.Router()
const db = require('../models/database')

module.exports = router

router.post('/login',(req,res)=>{
    console.log(req.body)
    console.log('login: ',req.body.name,req.body.pwd)
    if(req.body.name==='qwe'&&req.body.pwd==='qwe') { // 用户名密码正确，给该客户端一个sessionid
        req.session.sessionid = req.body.name
        res.send({
            err: 0,
            msg: 'OK'
        })  
    } else {
        res.send({
            err: 1,
            msg: '用户名或密码错误！'
        })
    }
})
router.get('/getPermission',(req,res)=>{
    console.log(req.session.sessionid,'sessionid')
    res.send({
        err: 0
    })
})