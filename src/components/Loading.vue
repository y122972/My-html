<template>
    <div class="main loading-text">
        <span class="point">L </span>
        <span class="point">o </span>
        <span class="point">a </span>
        <span class="point">d </span>
        <span class="point">i </span>
        <span class="point">n </span>
        <span class="point">g </span>
        <span class="point">· </span>
        <span class="point">· </span>
        <span class="point">· </span>
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
                startTime: 0,
            }
        },
        methods: {
            scale(node) {
                // setTimeout(() => {
                    
                // }, 0);
                node.style.transform=`scale(${this.scaleNum})`
            },
            unscale(node) {
                node.style.transform='scale(1)'
            },
            change(list){
                this.unscale(list[this.curBig])
                this.curBig++
                this.curBig%=list.length
                console.log('Loading...')
                this.scale(list[this.curBig])
                if(new Date().getTime()-this.startTime>this.limitTime) {
                    clearInterval(this.timer)
                    this.timer=null
                    document.querySelector('.loading-text').innerHTML='加载失败，请刷新！'
                }
            }
        },
        mounted () {
            this.startTime=new Date().getTime()
            let list = document.querySelectorAll('span.point')
            this.curBig=list.length-1
            this.change(list)
            this.timer = setInterval(()=>{
                this.change(list)
            },200)
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
        transition: .2s;
        display: inline-block;
    }
</style>