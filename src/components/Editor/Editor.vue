<template>
    <div class="editor-main">
        <div class="tools-bar">
            <ul>
                <li class="tool"
                    v-for="(item,key) in tools"
                    :key="key"
                    title="111"
                    @mousedown="toolsHandle(item.fn)">
                    <i :class="'iconfont icon-'+item.name"></i>
                </li>
            </ul>
            <div class="space"></div>
        </div>
        <div class="content-wrapper">
            <div class="content"
                 contenteditable="true"
                 spellcheck="false"
                 v-html="initHtml"></div>
        </div>
    </div>
</template>

<script>
    import './fonts/iconfont.css'
    import '../../assets/js/md5'
    export default {
        data() {
            return {
                tools: [{name: "cuti", desc: "粗体", fn: "bold"}, {name: "italic", desc: "斜体", fn: "italic"}, {name: "shanchu", desc: "清除格式", fn: "format"}, {name: 'shangchuan', desc: '上传', fn: 'upload'}],
                initHtml: '<p><br></p>',
                contentArea: null,
            }
        },
        methods: {
            init() {

            },
            toolsHandle(name) {
                let selection = window.getSelection()
                let range = selection.getRangeAt(0)
                console.log(range)
                switch(name) {
                    case 'bold' || 'italic': {
                        this.setRangeStyle(range, name)
                        return
                    }
                    case 'upload': {
                        this.$emit('upload', this.$el.querySelector('.content').innerHTML)
                        return 
                    }
                }
                
            },
            bold(range, content) {
                let newNode = this.createNode('el', content, 'span',)
                newNode.style = 'font-weight: bold;'
                return newNode
            },
            italic(range, content) {
                let newNode = this.createNode('el', content, 'span',)
                newNode.style = 'font-style: italic;'
                return newNode
            },
            setRangeStyle(range, name) {
                let curNode = range.startContainer
                if(curNode.nodeName !== '#text' || curNode !== range.endContainer ) {
                    console.log('不能这样修改！')
                    return
                }
                let curParent = curNode.parentNode,
                    start = range.startOffset,
                    end = range.endOffset,
                    mid = curNode.splitText(start),
                    behind = mid.splitText(end - start)
                    
                if(behind.textContent === '') {
                    behind.nodeValue = '.'
                }
                let newNode = this[name](range, mid.textContent)
                curParent.replaceChild(newNode, mid)
            },
            createNode(type, content, tag, ) {
                switch(type) {
                    case 'text': {
                        return document.createTextNode(content)
                    }
                    case 'el': {
                        let res = document.createElement(tag)
                        res.innerText = content
                        return res
                    }
                }
            }
        },
        mounted () {
            console.log(md5('12312452345'))
            console.log(this.$el)
            let el = this.$el
            let contentArea = el.querySelector('.content')
            
            el.querySelector('.content').onkeydown = () => {
                let lastChild = contentArea.lastChild
                if(!lastChild || contentArea.lastChild.innerHTML !== '<br>') { // 判断编辑区是否还有一个空节点或者东西删干净了，是就加一个空节点
                    let nullEl = document.createElement('p')
                    nullEl.innerHTML = '<br>'
                    contentArea.append(nullEl)
                }
            }
        },
        beforeDestroy() {
            this.$el.querySelector('.content').onkeydown = null

        },
        props: ['title', 'size', 'upload']
    }
</script>

<style scoped>
    .editor-main {
        width: 100%;
        height: 100%;
    }
    .tools-bar {
        z-index: 5;
    }
    .tools-bar ul {
        border-bottom: 1px solid #000;
        border-top: 1px solid #000;
        overflow: hidden;
        padding: 5px;
    }
    .tools-bar .space {
        width: 100%;
        background: transparent;
        height: 20px;
    }
    .tool {
        float: left;
        margin-right: 15px;
        padding: 5px;
        cursor: pointer;
        border-radius: 3px;
    }
    .tool:hover {
        box-shadow: inset 0px 0px 5px #999;
    }
    .content {
        outline: none;
        width: 100%;
        border: 1px solid #000;
        padding: 15px;
        border-radius: 5px;
        min-height: 30vh;
        line-height: 22px;
    }
</style>