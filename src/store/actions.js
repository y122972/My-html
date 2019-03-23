import * as types from './types'

const actions = {
    setCurArticlePage({commit},params){
        // commit({
        //     type: types.CURARTICLEPAGE,
        //     data: params
        // }) ???????
        commit(types.CURARTICLEPAGE, params)
    }
}

export default actions