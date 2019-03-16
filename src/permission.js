import router from './routes'


router.beforeEach(async (to, from, next) => {
    console.log('to',to,'from',from)
    next()
    // //if ( getToken() ){ // 判断是否登录，成功登录
    // if ( 1 ){ // 判断是否登录，成功登录
    //     if (to.path === '/login'){
    //         next('/')
    //     } else { // 判断是否已经动态生成了路由表
    //         if ( store.getters.navList.length == 0 ){
    //             // 获取应用导航列表

    //             //const response = await getNavList()
                
    //             // 通过 vuex 管理导航数据
    //             store.dispatch('createNavList', list)
    //             // 生成可访问的路由表
    //             router.addRoutes(GenerateRoutes(allRoutesMap, list))
    //             // hack 方法 确保 addRoutes 已完成
    //             next({ ...to, replace: true })
    //         } else {
    //             next()
    //         }
    //     }
    // } else { // 非登录
    //     if (whiteList.indexOf(to.path) !== -1){
    //         next()
    //     } else {
    //         next('/login')
    //         NProgress.done()
    //     }
    // }
})

// router.afterEach(() => {
//     NProgress.done() // 结束Progress
// })