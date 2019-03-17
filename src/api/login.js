import instance from './instance'



export const login = params => instance.post('/login',  params )
export const getPermission = params => instance.get('/login/getPermission',  { params } )