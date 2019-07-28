//还差模块化

let Vue
const forEach = (obj, cb) => {
    Object.keys(obj).forEach(item => {
        cb(obj[item], item)
    })
}
class Store {
    constructor(options) {
        this._vm = new Vue({
            data: {
                state: options.state
            }
            // data() {
            //     return {

            //     }
            // }
        })

        this.getters = {}
        let getters = options.getters || {}
        forEach(getters, (item, key) => {
            Object.defineProperty(this.getters, key, {
                get: () => { //防止下面的this指向问题, 要不然指向就是this.getters
                    return item(this.state)
                }
            })
        })
        this.mutations = {}
        let mutations = options.mutations || {}
        forEach(mutations, (item, key) => {
            this.mutations[key] = payload => {
                item(this.state, payload)
            }
        })
        this.actions = {}
        let actions = options.actions
        forEach(actions, (item, key) => {
            this.actions[key] = payload => {
                item(this, payload) // 不一样的地方：上面返回了state让定义好的mutations去直接操作state，而这里返回的state，让定义好的actions去操作commit和dispatch，这就是为什么mutations只能同步，actions可以异步
            }
        })
        // Object.keys(mutations).forEach(item => {
        //     Object.defineProperty(this.mutations, item, {
        //         get: () => {
        //             return mutations[item]
        //         }
        //     })
        // })
    }
    get state() {
        return this._vm.state
    }
    //发布订阅，mutations提前写好，需要用的时候commit一下，还有actions
    commit = (type, payload) => { // 因为负责调用commit的不是这里的store，所以不用箭头函数，异步调用的时候这里的this就不是Store了
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
}



const install = (_Vue) => {
    Vue = _Vue
    // 应该给每个vue实例增加$store
    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        },
    })
}

export default {
    install,
    Store
}