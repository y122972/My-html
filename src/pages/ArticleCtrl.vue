<template>
    <div class="article-control-main">
        <Editor 
            title="123"
            size="big"
            @upload="upload"
        />
    </div>
</template>

<script>
    import Editor from '../components/Editor/Editor'
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            upload(content) {
                console.log('upload', content)
            }
        },
        mounted () {
            
        },
        components: {
            Editor,
        }
    }
</script>

<style scoped>
    .article-control-main {
        width: 60%;
        margin: 0 auto;
    }
</style>