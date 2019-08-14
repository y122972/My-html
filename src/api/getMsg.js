/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-12 18:01:43
 * @LastEditTime: 2019-08-13 10:45:38
 * @LastEditors: Please set LastEditors
 */
import instance from './instance'



export const getNav = () => instance.get('/GET/nav')

export const getLinks = () => instance.get('/GET/links')

export const getArticle = params => instance.get('/GET/article', { params })

export const getArticleList = params => instance.get('/GET/articleList', { params })

export const getAllLabels = () => instance.get('/GET/labels')

