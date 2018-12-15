import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/style.css'
import './assets/fonts/iconfont.css'
import './assets/css/article.css'
import router from './routes'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/monokai.css' //样式文件

// Vue.directive('highlight', function (el) {
//     el.style.fontFamily="Consolas, 'Courier New', monospace"
//     el.style.fontSize='17px'
//     let blocks = el.querySelectorAll('pre code')
//     blocks.forEach((block) => {
//         hljs.highlightBlock(block)
//     })
// })
// 将hljs的渲染变成一个指令

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
