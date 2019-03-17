import instance from './instance'



export const uploadArticle = params => instance.post('/admin/uploadArticle', params )

export const delArticle = params => instance.get('/admin/delArticle', { params })