<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "app",
    data () {
        return {
            
        };
    },
    methods: {
        mouseClick(event){
            let newClick=document.createElement('div')
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
    
    
};
</script>
    
<style scoped>
#app {
    overflow: hidden;
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
