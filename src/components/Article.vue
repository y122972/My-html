<template>
    <div>
        <div class="main">
            <div class="labels">
                <ul>
                    <li v-for="(item,key) in article.labels"
                        :key="key"
                        class="label">{{item}}</li>
                </ul>
            </div>
            <h1 class="title">{{$route.params.title}}</h1>
            <p class="time">{{new Date(article.time-0).toLocaleString()}}</p>
            <Loading v-if="loading"></Loading>
            <div class="content">
                <div class="mainText"
                     v-html="article.content"></div>
            </div>
        </div>
        <div class="comment">
            <div class="reply-box">
                <el-input type="textarea"
                          autosize
                          placeholder="在此输入评论哦"
                          v-model="thisComment"
                          resize="none">
                </el-input>
                <el-button type="success"
                           round
                           size="medium"
                           :disabled="this.thisComment===''?true:false"
                           @click="sendComment(thisComment)">回 复</el-button>
            </div>
            <ul>
                <li class="comment-item"
                    v-for="(item,key) in comment"
                    :key="key">
                    <p class="floor">
                        <span class="floor-num">{{item.floor}}楼 </span>
                        <span class="reply-floor"> {{item.reply!=-1?`回复 ${item.reply} 楼`:''}}</span>
                        <span class="time">{{new Date(item.time-0).toLocaleString()}}</span>
                    </p>
                    <p class="comment-content">{{item.content}}</p>
                    <div class="tools">
                        <span class="like tool">
                            <i class="iconfont icon-dianzan"></i>
                            <span class="like-num">{{item.like}}</span>
                        </span>
                        <span class="to-reply tool"
                              @click="replyShow(key)">
                            <i class="iconfont icon-edit"></i> 回复
                        </span>
                    </div>
                    <div class="reply-box"
                         v-show="item.replyVisible">
                        <el-input type="textarea"
                                  autosize
                                  placeholder="在此输入评论哦"
                                  v-model="item.replyContent"
                                  resize="none">
                        </el-input>
                        <el-button type="success"
                                   round
                                   size="medium"
                                   :disabled="(item.replyContent===''||!item.replyContent)?true:false"
                                   @click="sendComment(item.replyContent,item.floor,key)">回 复</el-button>
                        <span v-show="false">{{item.deleted}}</span>
                        <!-- item.replyComment没有或者回复内容为空的时候不可点击 -->
                    </div>

                </li>
            </ul>
            <el-pagination layout="prev, pager, next"
                           :total="totalComment"
                           :page-size="commentPageSize"
                           @current-change="commentPageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getArticle, getComment, addComment } from "../api";
import Loading from './Loading'
export default {
    name: "Article",
    data () {
        return {
            thisComment: '',
            article: {},
            totalComment: 0,
            commentPageSize: 10,
            comment: [],
            curCommentPage: 0,
            loading: true,
        };
    },
    methods: {
        commentPageChange (page) {
            this.curCommentPage = page - 1
            this.getComment(page - 1, this.commentPageSize)
        },
        replyShow (key) {
            this.comment[key].deleted++
            this.comment[key].replyVisible = !this.comment[key].replyVisible
        },
        async getComment (page = 0, pageSize = 10) {
            console.log(page, pageSize)
            let result = await getComment({
                articleId: this.$route.query.id,
                page,
                pageSize
            })
            console.log(result)
            this.comment = result.data[0]
            this.totalComment = result.data[1][0].total
        },
        async sendComment (msg, reply = -1, key = -1) {
            let result = await addComment({
                articleId: this.$route.query.id,
                content: msg,
                time: new Date().getTime(),
                reply
            })
            if (!result.data.err) {
                this.$message({
                    message: result.data.msg,
                    type: 'success'
                })
            }
            key === -1 ? this.thisComment = '' : this.comment[key].replyContent = ''
            this.getComment(this.curCommentPage, this.commentPageSize)
        },
        async getArticle () {
            this.loading=true
            let result = await getArticle({
                id: this.$route.query.id
            })
            this.article = result.data[0]
            this.loading=false
        }
    },
    created () {
        this.getComment()
    },
    mounted () {
        this.getArticle()
    },
    components: {
        Loading,
    }
};
</script>

<style scoped>
.mainText {
    white-space: pre-wrap;
    word-break: break-all;
}
.main {
    width: 60%;
    margin: 0 auto;
    padding: 15px;
}
.labels {
    line-height: 30px;
    width: 100%;
    height: 40px;
    font-size: 14px;
}
.labels li {
    float: left;
    padding: 0 15px;
    margin-right: 10px;
    border: 1px solid rgb(2, 133, 21);
    border-radius: 50px;
    color: rgb(2, 133, 21);
    cursor: pointer;
    transition: 0.2s;
}
.labels li:hover {
    color: #fff;
    background: rgb(2, 133, 21);
}
.title {
    font-size: 30px;
    line-height: 50px;
}
.time {
    font-style: oblique;
    margin-top: 10px;
    color: rgb(166, 166, 166);
    font-family: 华文楷体;
    font-size: 19px;
}
.content {
    margin-top: 30px;
    font-size: 17px;
    line-height: 30px;
    min-height: 500px;
}
.comment {
    width: 50%;
    min-width: 800px;
    margin: 0 auto;
    margin-top: 50px;
}
.comment .time {
    float: right;
    font-size: 16px;
}
.comment li {
    border-bottom: 1px solid rgba(2, 133, 21, 0.15);
    padding: 15px 20px;
    line-height: 30px;
}
.comment .comment-content {
    padding-left: 40px;
    white-space: pre-wrap;
    word-break: break-all;
}
.comment .tools .tool {
    min-width: 50px;
    display: inline-block;
    cursor: pointer;
    color: rgba(2, 133, 21, 0.8);
    user-select: none;
}
.comment .tools .tool:hover {
    color: rgb(2, 133, 21);
}
.comment .reply-box {
    padding: 0 20px;
    margin-top: 15px;
}
.comment .reply-box .el-textarea {
    width: 85%;
    font-size: 16px;
}
.comment .reply-box .el-textarea .el-textarea__inner {
}
.comment .reply-box button {
    width: 10%;
    margin-left: 2%;
}
</style>