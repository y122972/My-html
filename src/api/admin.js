import instance from './instance'



export const uploadArticle = params => instance.post('/admin/uploadArticle', params )

export const delArticle = params => instance.delete('/admin/delArticle', { params })

export const addNewLabels = params => instance.post('/admin/addNewLabels', params)