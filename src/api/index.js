import axios from 'axios'
import qs from 'qs'
import common from '../assets/js/common'

console.info(common)

const instance = axios.create({
  baseURL: common.baseUrl,
  timeout: 4000,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  paramsSerializer: params => {
    // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
    return qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  },
  transformRequest: [data => {
    // 在向服务器发送前修改请求数据，只适用于 POST
    return qs.stringify(data, {
      arrayFormat: 'repeat'
    })
  }],
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'

  //   //'Content-Type': 'application/json;charset=UTF-8'
  // },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

})

/**
 * 向后台请求数据的 API 接口
 */

export const getNav = () => instance.get('/getNav')
export const getLinks = () => instance.get('/getLinks')
export const getArticle = params => instance.get('/getArticle', { params })
export const uploadArticle = params => instance.post('/uploadArticle', params )
export const getArticleList = params => instance.get('/getArticleList', { params })
export const delArticle = params => instance.get('/delArticle', { params })
export const getComment = params => instance.get('/getComment', { params })
export const addComment = params => instance.get('/addComment', { params })
