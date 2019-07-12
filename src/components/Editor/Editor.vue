<template>
    <div class="editor-main">
        <div class="tools-bar">
            <ul>
                <li class="tool"
                    v-for="(item,key) in tools"
                    :key="key">
                    <i :class="'iconfont icon-'+item.name"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import './fonts/iconfont.css'
    export default {
        data() {
            return {
                tools: [{name: "cuti", desc: "粗体"}, {name: "italic", desc: "斜体"}, {name: "shanchu", desc: "清除格式"},],
            }
        },
        methods: {
            
        },
        mounted () {
            console.log(this.title)
        },
        props: ['title', 'size']
    }
</script>

<style scoped>
    .editor-main {
        width: 100%;
        height: 100%;
    }
    .tool {
        float: left;
    }
</style>