import instance from './instance'



export const getNav = () => instance.get('/get/getNav')

export const getLinks = () => instance.get('/get/getLinks')

export const getArticle = params => instance.get('/get/getArticle', { params })

export const getArticleList = params => instance.get('/get/getArticleList', { params })

