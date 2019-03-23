<template>
    <div>
        <div class="main">
            <ul class="item-list">
                <li v-for="(item,key) in list"
                    :key="key"
                    class="item"
                    @click="toArticle(item.id,item.title)">
                    <h3 class="title">{{item.title}}</h3>
                    <p class="front">{{item.front}}</p>
                    <p class="time">{{new Date(item.time-0).toLocaleString()}}</p>
                </li>
            </ul>
            <Loading v-if="loading"></Loading> 
            <el-pagination background
                           layout="prev, next"
                           :total="total"
                           :page-size="pageSize"
                           :current-page="curPage"
                           @current-change="pageChange">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import { getArticleList } from '../api'
import { mapGetters,mapActions } from 'vuex'
import Loading from './Loading'
export default {
    name: 'Home',
    data () {
        return {
            list: [],
            total: 0,
            pageSize: 10,
            curPage: 1,
            loading: true,
        }
    },
    methods: {
        ...mapActions([
            'setCurArticlePage'
        ]),
        pageChange (page) {
            console.log('curPage: ',page)
            document.documentElement.scrollTop=0
            this.getList(page - 1)
            this.curPage=page
            this.setCurArticlePage({
                curPage: this.curPage
            })
        },
        async getList (page = 0, pageSize = 10) {
            this.loading=true
            let result = await getArticleList({ page, pageSize })
            this.loading=false
            console.log('curPageArticle: ',result.data)
            this.list = result.data[0]
            this.total = result.data[1][0].total
            this.curPage=page+1 //在这变
        },
        toArticle (id, title) {
            console.log(id,title,'to article')
            console.log(this.list)
            this.$router.push({
                name: 'article',
                params: { title },
                query: { id }
            })
        }
    },
    computed: {
        ...mapGetters([
            'curArticlePage'
        ])
    },
    mounted () {
        // this.curPage=this.curArticlePage
        //  不能在这改变当前页，因为页面加载完就改变当前页el-pagination反应不过来，不知道总共有多少页啥的
        this.getList(this.curArticlePage-1)
        console.log(this.list, 'list')
    },
    components: {
        Loading,
    }
}
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
}
.main li {
    cursor: pointer;
    transition: 0.2s;
    margin-top: 15px;
    border-bottom: 1px solid #ddd;
    padding: 20px;
    word-break: break-all;
    color: rgb(56, 56, 56);
}
.main li:hover {
    box-shadow: 0 3px 5px #ddd;
    /* color: rgb(5, 163, 116); */
    color: rgb(2, 133, 21);
}
.main li:hover .front {
    color: rgb(2, 133, 21);
}
.main li:hover .time {
    color: rgb(2, 133, 21);
}
.main li .title {
    font-size: 23px;
    line-height: 30px;
}
.main li .front {
    line-height: 25px;
    color: rgb(155, 155, 155);
    font-style: oblique;
    margin-top: 10px;
}
.main li .time {
    font-style: oblique;
    text-align: right;
    margin-top: 10px;
    color: rgb(196, 196, 196);
    font-family: 华文楷体;
    font-size: 19px;
}
</style>