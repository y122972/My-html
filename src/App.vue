<template>
    <div id="app" @click="mouseClick">
        <AppHeader></AppHeader>
        <div class="main">
            <div class="content"
                 :style="'minHeight: '+mainMinHeight+'px'">
                <router-view></router-view>
            </div>
            <AppFooter></AppFooter>
        </div>
    </div>
</template>

<script>
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
export default {
    name: "app",
    data () {
        return {
            mainMinHeight: null,
        };
    },
    methods: {
        mouseClick(event){
            let newClick=document.createElement('div')
            console.log(event.clientX,event.clientY)
            newClick.className='mouse-click'
            newClick.style=`border-radius: 50%;
                            width: 4px;
                            height: 4px;
                            border: 2px solid rgb(233,233,233);
                            position: absolute;
                            left: ${event.clientX}px;
                            top: ${event.clientY+document.documentElement.scrollTop}px;
                            z-index: 20;
                            transition: .5s;`
            setTimeout(() => {
                newClick.style.transform='scale(30)'
                newClick.style.opacity='0'
            }, 10);
            document.querySelector('#app').appendChild(newClick)
            setTimeout(()=>{
                document.querySelector('#app').removeChild(newClick)
            },500)
            //console.log(document.documentElement.scrollTop)
        }
    },
    components: {
        AppHeader,
        AppFooter
    },
    mounted () {
        this.mainMinHeight = window.innerHeight - this.$store.state.headerHeight
    }
};
</script>
    
<style scoped>
#app {
    overflow: hidden;
}
.main {
    margin-top: 80px;
}
.mouse-click {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
}
</style>
