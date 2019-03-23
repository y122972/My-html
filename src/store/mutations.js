import * as types from './types'

const mutations = {
    [types.CURARTICLEPAGE] (state, payload){
        state.curArticlePage = payload.curPage
    }
}

export default mutations