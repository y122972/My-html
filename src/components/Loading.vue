<template>
    <div class="main">
        <span>L </span>
        <span>o </span>
        <span>a </span>
        <span>d </span>
        <span>i </span>
        <span>n </span>
        <span>g </span>
        <span>· </span>
        <span>· </span>
        <span>· </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curBig: 0,
                scaleNum: 2.2,
            }
        },
        methods: {
            scale(node) {
                setTimeout(() => {
                    node.style.transform=`scale(${this.scaleNum})`
                }, 10);
            },
            unscale(node) {
                node.style.transform='scale(1)'
            }
        },
        mounted () {
            let startTime=new Date().getTime()
            let list = document.querySelectorAll('span')
            let len = list.length
            this.scale(list[0])
            let timer = setInterval(()=>{
                this.unscale(list[this.curBig])
                this.curBig++
                this.curBig%=len
                this.scale(list[this.curBig])
            },200)
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