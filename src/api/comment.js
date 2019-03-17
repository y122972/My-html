import instance from './instance'




export const getComment = params => instance.get('/comment/get', { params })

export const addComment = params => instance.get('/comment/add', { params })