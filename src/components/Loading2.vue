<template>
    <div>
        <div class="main loading-text">
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
            <span class="point"></span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curBig: 0,
                scaleNum: 2.2,
                limitTime: 5000,
                timer: null,
                everyTime: 150,//每个小球
            }
        },
        methods: {
            
            
        },
        mounted () {
            let startTime=new Date().getTime()
            let list = document.querySelectorAll('span.point')
            let len = list.length
            list.forEach(item => {
                item.style.transition=`${len*this.everyTime/1000}s`
            });
            for(let i=0;i<len;i++){
                setTimeout(() => {
                    setInterval(()=>{
                        if(list[i].state=='big'){
                            list[i].style.transform='scale(1)'
                            list[i].state='small'
                        } else {
                            list[i].style.transform='scale(20)'
                            list[i].state='big'
                        }

                    },len*this.everyTime)
                }, this.everyTime*i);
            }
        },
        beforeDestroy(){
            clearInterval(this.timer)
            this.timer=null
        }
    }
</script>

<style scoped>
    .main {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        white-space: pre-wrap;
        padding: 0;
    }
    span {
        display: inline-block;
        width: 1px;
        height: 1px;
        background: rgb(2,133,21);
        border-radius: 50%;
        margin: 10px;
    }
</style>