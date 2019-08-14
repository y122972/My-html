<template>
    <div class="j-scroll" style="">
        <div class="j-scroll__wrapper" :style="'max-height: ' + height + 'px'">
            <slot></slot>
        </div>
        <div class="j-scroll__bar"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        mounted () {
            this.$el.addEventListener('scroll', () => {
                console.log('scroll')
            })
        },
        props: {
            height: [String, Number],
        }
    }
</script>

<style scoped>
    .j-scroll {
        border: 1px solid #e4e7ed;
        box-sizing: border-box;
        border-radius: 5px;
        overflow: hidden;
    }
    .j-scroll__wrapper {
        margin-right: -15px;
        margin-bottom: -15px;
        overflow: scroll;
    }
    .j-scroll__bar {
        position: absolute;
    }
</style>