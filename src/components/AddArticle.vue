<template>
    <div>
        <div class="main">
            <el-dialog :modal="false"
                       :title="dialog.title"
                       :visible.sync="dialog.visible"
                       width="30%">
                <div v-if="dialog.visible1">
                    <el-input v-model="dialog.link"
                              placeholder="链接"></el-input>
                </div>
                <br/>
                <div v-if="dialog.visible2">
                    <el-input v-model="dialog.linkTitle"
                              placeholder="标题"></el-input>
                </div>
                <div v-if="dialog.visible3"
                     style="width: 30%  float: left ">
                    <el-select v-model="dialog.selectedLan"
                               placeholder="请选择语言">
                        <el-option v-for="item in dialog.languages"
                                   :key="item.value"
                                   :label="item.name"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <br/>
                <div v-if="dialog.visible3">
                    <textarea v-model="dialog.code"
                              class="code-area"></textarea>
                </div>
                <div v-if="dialog.visible4"
                     class="article-list">
                     <Loading v-if="loading"></Loading>
                    <el-table :data="articleList"
                              style="width: 100%">
                        <el-table-column label="标题"
                                         prop="title">
                        </el-table-column>
                        <el-table-column label="时间">
                            <template slot-scope="scope">
                                <span>{{new Date(scope.row.time-0).toLocaleString()}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot-scope="scope">
                                <el-button size="mini"
                                           @click="articleOperate(scope.$index, scope.row,0)">Edit</el-button>
                                <el-button size="mini"
                                           type="danger"
                                           @click="articleOperate(scope.$index, scope.row,1)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background
                                   layout="prev, pager, next"
                                   :total="article.total"
                                   :page-size="10"
                                   @current-change="pageChange">
                    </el-pagination>
                </div>
                <span slot="footer"
                      class="dialog-footer">
                    <el-button @click="dialog.visible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <input type="text"
                   v-model="article.title"
                   class="title"
                   placeholder="标题">
            <el-select
                v-model="selectedLabels"
                multiple
                filterable
                allow-create
                collapse-tags
                placeholder="请选择文章标签">
                    <el-option
                    v-for="(item,key) in allLabels"
                    :key="key"
                    :label="item"
                    :value="key">
                    </el-option>
            </el-select>
            <div class="select" v-if="selectOptions.length">
                <j-select 
                    v-model="selectedLabels"
                    :options="selectOptions"
                    multiple
                />
            </div>
            
            <j-input 
                type="text"
                v-model="inputValue"
                placeholder="请输入"
                :disabled="true"
            />
            <!-- <div class="tools-bar">
                <ul>
                    <li class="tool"
                        v-for="(item,key) in tools"
                        :key="key"
                        @mousedown="setStyle(item.desc)">
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="item.desc"
                                    placement="bottom"
                                    :open-delay="400">
                            <i :class="'iconfont icon-'+item.name"></i>
                        </el-tooltip>
                    </li>
                </ul>
            </div> -->
            <div class="main-content content"
                 contenteditable="true"
                 data-text="输入留言"
                 spellcheck="false"
                 v-html="initContent">
            </div>
        </div>
    </div>
</template>

<script>
import hljs from "highlight.js"
import { uploadArticle, getArticleList, getArticle, delArticle,getPermission,getAllLabels ,addNewLabels} from "../api"
import Loading from './Loading'
import JSelect from './JSelect'
import JInput from './JInput'
export default {
    name: "AddArticle",
    updated () {
        console.log(this.selectValue)
    },
    data () {
        return {
            selectOptions: [],
            selectValue: [],
            inputValue: '',
            allLabels: [],
            initAllLabels: [],
            selectedLabels: [],
            loading: true,
            articleList: [],
            dialog: {
                title: "插入",
                visible: false,
                link: "",
                linkTitle: "",
                visible1: false,
                visible2: false,
                visible3: false,
                visible4: false,
                code: "",
                languages: [
                    {
                        name: "html",
                        value: "html"
                    },
                    {
                        name: "css",
                        value: "css"
                    },
                    {
                        name: "javascript",
                        value: "javascript"
                    }
                ],
                selectedLan: ""
            },
            initContent: `<div><span><br/></span></div>`,
            lastContent: '',
            article: {
                id: null,
                title: "",
                label: "",
                total: 1000
            },
            autoSave: null,
            startAutoSave: false,
            selection: {
                string: "",
                start: 0,
                end: 0,
                pos: 0,
                len: 0,
                parentNode: null,
                selectedNode: null
            },
            tools: [
                {
                    name: "cuti",
                    desc: "粗体"
                },
                {
                    name: "italic",
                    desc: "斜体"
                },
                {
                    name: "shanchu",
                    desc: "清除格式"
                },
                {
                    name: "zhuangshiyongyinhao",
                    desc: "引用"
                },
                {
                    name: "insert_tag_field",
                    desc: "代码"
                },
                {
                    name: "htmal5icon12",
                    desc: "图片"
                },
                {
                    name: "chaolianjie",
                    desc: "链接"
                },
                {
                    name: "icenter",
                    desc: "换行"
                },
                {
                    name: "shang-copy",
                    desc: "上插一行"
                },
                {
                    name: "quanbu",
                    desc: "展示内容"
                },
                {
                    name: "shangchuan",
                    desc: "上传"
                },
                {
                    name: "xiazai",
                    desc: "修改文章"
                }
            ],
            listPage: 1,
            pageSize: 10,
        }
    },
    methods: {
        
        pageChange (page) {
            //console.log(page)
            this.listPage=page
            this.getList()

        },
        async getAllLabels (){
            let res = await getAllLabels()
            res.data.forEach(item => {
                this.allLabels.push(item.label)
                this.selectOptions.push({
                    value: item.id,
                    label: item.label,
                })
            })
            this.initAllLabels=[...this.allLabels] //用于添加新label
            console.log(this.selectOptions)
            console.log('all labels',res.data)
        },
        async articleOperate (index, row, oprt) {
            // oprt == 0, Edite,else , delete
            if (oprt === 0) {
                // Edite
                this.article.id = row.id
                // Change current article id , so to updating instead of uploading
                let result = await getArticle({ id: row.id })
                this.article.title = result.data[0].title
                this.mainCon.innerHTML = result.data[0].content
                this.dialog.visible = false
                if(result.data[0].label.length){
                    this.selectedLabels=result.data[0].label.split(',')
                } else {
                    this.selectedLabels=[]
                }
                console.log(this.selectedLabels)
            } else {
                // delete 
                let result = await delArticle({ id: row.id })
                //console.log(result.data)
                this.$message({
                    message: result.data.msg,
                    type: 'success'
                })
                this.getList(this.listPage-1)
            }
        },
        err (msg) {
            this.$message({
                message: msg,
                type: "warning"
            })
        },
        async getList () {
            this.loading=true
            
            let result = await getArticleList({ page:this.listPage-1, pageSize: this.pageSize })
            //console.log(result.data)
            this.loading=false
            this.articleList = result.data[0]
            this.article.total = result.data[1][0].total
        },
        async upload () {

            this.article.label=this.selectedLabels.join(',')
            
            this.lastContent = this.mainCon.innerHTML //存一下上次保存的内容，供自动保存来比较
            this.startAutoSave = true

            let result = await uploadArticle({
                id: this.article.id,
                title: this.article.title,
                time: new Date().getTime(),
                front: this.mainCon.innerText.substring(0, 200),
                content: this.mainCon.innerHTML,
                author: "JM",
                label: this.article.label
            })
            //console.log(result)
            let newLabels=[]
            for(let i = 0; i<this.selectedLabels.length; i++) {
                if(!this.initAllLabels.includes(this.selectedLabels[i])){
                    newLabels.push(this.selectedLabels[i])
                }
            }
            if(newLabels.length){
                await addNewLabels({
                    newLabels
                })
            }
            console.log('selected labels:',this.selectedLabels,'new label(s)',newLabels)
            if (!result.data.err) {
                this.$message({
                    message: result.data.msg,
                    type: "success"
                })
                this.article.id = result.data.id
            } else {
                this.$message({
                    message: result.data.msg,
                    type: "warning"
                })
            }
        },
        dialogConfirm () {
            // 弹出框确认函数，只有插图片和链接有弹出框，
            console.log(this.dialog.title)
            if (this.dialog.title === "展示内容") {
                this.mainCon.innerHTML = this.dialog.code
                this.dialog.visible = false
                return 
            }
            if (
                this.selection.parentNode.nodeName != "DIV" ||
                this.selection.parentNode.className != "" ||
                this.selection.selectedNode.nodeName != "SPAN"
            ) {
                // 如果选中的不是一个class为空的的div就选错了, 不能插入任何东西
                this.err("不可在此插入！")
                this.dialog.visible = false

                return
            }

            let content = this.mainCon.innerHTML,
                frontDom = null,
                waitingIns = null,
                string = this.selection.selectedNode.innerHTML
            // 待插入节点
            if (this.dialog.title === "插入图片") {
                // 再选中区域下一行插入
                waitingIns = document.createElement("div")
                waitingIns.className = "img"
                waitingIns.innerHTML = `<img src=${
                    this.dialog.link
                    } alt="1.jpg" title="1.jpg" /><span class="img-desc">${
                    this.dialog.linkTitle
                    }</span>`

                if (this.selection.parentNode.nextSibling == null) {
                    this.mainCon.appendChild(waitingIns)
                } else {
                    this.mainCon.insertBefore(
                        waitingIns,
                        this.selection.parentNode.nextSibling
                    )
                }
            } else if (this.dialog.title === "插入链接") {
                // 插入链接
                frontDom = this.selection.selectedNode.cloneNode(false)
                waitingIns = document.createElement("a")
                waitingIns.href = this.dialog.link
                waitingIns.innerHTML = this.dialog.linkTitle
                frontDom.innerHTML =
                    string.substring(0, this.selection.start) + " "
                this.selection.selectedNode.innerHTML =
                    " " + string.substring(this.selection.end)
                this.selection.parentNode.insertBefore(
                    frontDom,
                    this.selection.selectedNode
                )
                this.selection.parentNode.insertBefore(
                    waitingIns,
                    this.selection.selectedNode
                )
            } else {
                //插入代码
                waitingIns = document.createElement("code")
                waitingIns.className = this.dialog.selectedLan || ""
                waitingIns.style.paddingLeft = "30px"
                waitingIns.style.borderRadius = "5px"
                waitingIns.style.fontFamily =
                    "Consolas, 'Courier New', monospace"
                waitingIns.style.fontSize = "17px"
                waitingIns.innerText = this.dialog.code
                hljs.highlightBlock(waitingIns)
                //console.log(this.article.code)
                if (this.selection.parentNode.nextSibling == null) {
                    this.mainCon.appendChild(waitingIns)
                } else {
                    this.mainCon.insertBefore(
                        waitingIns,
                        this.selection.parentNode.nextSibling
                    )
                }
                //console.log("up?")
            }

            [
                this.dialog.title,
                this.dialog.link,
                this.dialog.linkTitle,
                this.dialog.visible,
                this.dialog.visible1,
                this.dialog.visible2,
                this.dialog.visible3,
                this.dialog.code
            ] = ["", "", "", false, false, false, false, ""]
            // 清除弹出框属性
        },
        setDialog (num, title) {
            this.dialog.visible = true
            let res = []
            if (num == 1) {
                res = [true, true, false, false]
            } else if (num === 2) {
                res = [false, false, true, false]
            } else {
                res = [false, false, false, true]
            }
            [
                this.dialog.visible1,
                this.dialog.visible2,
                this.dialog.visible3,
                this.dialog.visible4
            ] = res
            this.dialog.title = title
        },
        setStyle (toolname) {

            // 这几个任何时候都可以点击
            if (toolname === "展示内容") {
                this.setDialog(2, "展示内容")
                this.dialog.code = this.mainCon.innerHTML
                return
            } else if (toolname === "上传") {
                this.upload()
                return 
            } else if (toolname === "修改文章") {
                this.setDialog(3, "文章列表")
                this.getList()
                return
            }
            // 只能单独的段修改样式，不能跨段落，段以回div分隔
            let selection = window.getSelection()
            // 获取被选中的文字区域
            let range = selection.getRangeAt(0)
            //console.log(range)
            // 获取区域对象

            //console.log(selection.toString())
            // 被选中的文字
            // 选中区域在段中开始位置 range.startOffset
            // 结束位置              range.endOffset
            this.selection.start = range.startOffset
            this.selection.end = range.endOffset
            if (selection.anchorNode.nodeName === "#text") {
                this.selection.parentNode =
                    selection.anchorNode.parentNode.parentNode
                this.selection.selectedNode = selection.anchorNode.parentNode
            } else {
                this.selection.parentNode = selection.anchorNode.parentNode
                this.selection.selectedNode = selection.anchorNode
            }
            // 设置，给弹出框使用
            if (this.selection.parentNode.nodeName == "LI") {
                this.err("不可这样修改！")
                return
            }
            let string = this.selection.selectedNode.innerHTML
            // 被选中的文字所属段所有文字

            if (toolname === "粗体" || toolname === "斜体") {
                if (range.startContainer != range.endContainer) {
                    this.err("不可跨标签修改！")
                    return
                }
                let waitingStyle = ""

                //let frontDom = this.selection.selectedNode.cloneNode(false)
                //let midDom = this.selection.selectedNode.cloneNode(false)
                let frontDom= document.createElement('span')
                let midDom = document.createElement('span')
                if(this.selection.selectedNode.innerText.length==Math.abs( this.selection.end-this.selection.start)){
                    if (toolname === "粗体") {
                        this.selection.selectedNode.style.fontWeight = "bold"
                    } else {
                        this.selection.selectedNode.style.fontStyle = "oblique"
                    }
                    return 
                }
                
                if (toolname === "粗体") {
                    midDom.style.fontWeight = "bold"
                } else {
                    midDom.style.fontStyle = "oblique"
                }
                frontDom.innerHTML =
                    string.substring(0, range.startOffset) == ""
                        ? " "
                        : string.substring(0, range.startOffset)
                midDom.innerHTML = string.substring(
                    range.startOffset,
                    range.endOffset
                )
                this.selection.selectedNode.innerHTML =
                    string.substring(range.endOffset) == ""
                        ? " "
                        : string.substring(range.endOffset)
                this.selection.parentNode.insertBefore(
                    frontDom,
                    this.selection.selectedNode
                )
                this.selection.parentNode.insertBefore(
                    midDom,
                    this.selection.selectedNode
                )
            } else if (toolname === "换行" || toolname === "上插一行") {
                let waitingIns = document.createElement("div")
                waitingIns.innerHTML = "<span><br/></span>"
                if (this.selection.parentNode.parentNode == this.mainCon) {
                    if (
                        toolname === "换行" &&
                        this.selection.parentNode.nextSibling == null
                    ) {
                        this.mainCon.appendChild(waitingIns)
                    } else if (
                        toolname === "换行" &&
                        this.selection.parentNode.nextSibling != null
                    ) {
                        this.mainCon.insertBefore(
                            waitingIns,
                            this.selection.parentNode.nextSibling
                        )
                    } else {
                        this.mainCon.insertBefore(
                            waitingIns,
                            this.selection.parentNode
                        )
                    }
                } else {
                    if(toolname === "换行"){
                        this.mainCon.appendChild(waitingIns)
                    } else {
                        this.$message({
                            message: "不可！",
                            type: "warning"
                        })
                    }
                }
            } else if (toolname === "图片") {
                this.setDialog(1, "插入图片")
            } else if (toolname === "链接") {
                this.setDialog(1, "插入链接")
            } else if (toolname === "清除格式") {
                this.selection.selectedNode.style = ""
            } else if (toolname === "引用") {

                if(!this.selection.parentNode.className){
                    this.selection.parentNode.className = "reference"
                }
                else {
                    this.selection.selectedNode.classList.add('reference')
                }
                
            } else if (toolname === "代码") {
                this.setDialog(2, "插入代码")
            } 
            //console.log("parent: ", this.selection.parentNode)
            //console.log("selected: ", this.selection.selectedNode)
        },
        // async getPermission(){
        //     let res = await getPermission({})
        //     console.log(res)
        // }
    },
    mounted () {
        //this.getPermission()
        this.mainCon = document.querySelector(".main-content")
        this.autoSave = setInterval(()=>{
            if(this.startAutoSave && this.lastContent != this.mainCon.innerHTML){
                this.upload()
            }
        },10000)
        this.getAllLabels()
        // document.onscroll=()=>{
        //     if(document.documentElement.scrollTop>90){
        //         document.querySelector('.tools-bar').style.top='70px'
        //     document.querySelector('.tools-bar').classList.add('fixed')
            
        //     } else {
        //         document.querySelector('.tools-bar').classList.remove('fixed')
        //         document.querySelector('.tools-bar').style.top=`${200-document.documentElement.scrollTop}px`
        //     }
        // }
    },
    updated () {
        console.log(this.selectedLabels)
    },
    beforeDestroy(){
        document.onscroll=null
        clearInterval(this.autoSave)
        this.autoSave = null
    },
    components: {
        Loading,
        'j-select': JSelect,
        'j-input': JInput,
    }
} 
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding: 20px;
}
.title {
    font-size: 30px;
    width: 100%;
    height: 50px;
    line-height: 40px;
    padding: 10px 20px;
    outline: none;
    border: 0 solid #000;
    font-weight: bold;
}
.tools-bar {
    position: fixed;
    top: 400px;
    width: calc(60% - 40px);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    background: #fff;
    z-index: 1000;
}

.tools-bar.fixed {
    box-shadow: 0px 0px 20px #bbb;
    border: 1px solid #fff;
}
.tools-bar ul {
    height: 30px;
}
.tools-bar li {
    float: left;
    width: 33px;
    height: 30px;
    line-height: 30px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
}
.tools-bar li:hover {
    background: rgb(250, 250, 250);
    box-shadow: 0px 0px 3px #999 inset;
}
.tools-bar li i {
    font-size: 20px;
    color: rgb(2, 133, 21);
    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
}
.main-content,
textarea {
    min-height: 600px;
    width: 100%;
    border: 1px solid rgb(2, 133, 21);
    outline: none;
    margin-top: 170px;
    padding: 15px;
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 17px;
    line-height: 30px;
    resize: none;
    font-family: 微软雅黑;
    border-radius: 10px;
}
textarea {
    min-height: 400px;
}
.main-content div {
    float: left;
}
.main /deep/ .is-focus .el-input__inner{
    border: 1px solid rgb(2, 133, 21);
}

.el-scrollbar .el-select-dropdown__item.selected{
    color: rgb(2, 133, 21)
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: rgba(2,133,21,.07);
}
.select {
    width: 300px;
}
</style>