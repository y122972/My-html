const express = require('express')
const router = express.Router()
const db = require('../models/database')

const md5 = require('../models/md5.js')

module.exports = router

let loginRand = {}

let clearCache = () => {
    let time = +new Date()
    for(let key in loginRand) {
        if(time - loginRand[key].time > 10000) {
            delete loginRand[key]
        }
    }
}

router.post('/', (req, res) => {
    let key = req.body.name
    console.log('Login request', key, req.body.pwd)
    clearCache()
    if(!req.body.pwd) { // 第一次请求，不带密码，返回一个随机数
        let rand = Number.parseInt(Math.random() * 100)
        loginRand[key] = {
            rand,
            time: +new Date(),
        } //把用户对应的随机数存起来
        res.send({
            err: 0,
            rand,
        })
        return
    }
    // 第二次请求有密码，md5，服务端加密正确密码和随机数，进行对比
    console.log(loginRand[key].rand + 'qwe')
    let secret = md5(loginRand[key].rand + 'qwe')
    if (req.body.name === 'qwe' && req.body.pwd === secret) { // 用户名密码正确，给该客户端一个sessionid
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
router.get('/getPermission', (req, res) => {
    console.log(req.session.sessionid, 'sessionid')
    res.send({
        err: 0
    })
})