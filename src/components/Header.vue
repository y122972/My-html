<template>
    <div class="wrapper">
        <div class="header">
            <div class="left">
                <h1>{{blogName}}</h1>
            </div>
            <div class="right">
                <ul class="tag-list">
                    <li v-for="(item,key) in list"
                        :key="key"
                        @click="searchClick(item.name)">
                        <router-link :to="item.name=='Search'?$route.fullPath:item.link">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            <transition name="show-animation">
                <div class="search" v-show="searchShow">
                    <el-input v-model="search" @focus="inputFocus" @blur="inputBlur" ></el-input>
                    <el-select v-model="optionValue" @change="startSearch">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { getNav } from '../api'
export default {
    name: 'AppHeader',
    data () {
        return {
            blogName: "JM's",
            list: [],
            search: '',
            options: [{
                value: 'all',
                label: '全部'
            }, {
                value: 'title',
                label: '标题'
            }, {
                value: 'content',
                label: '内容'
            }, {
                value: 'label',
                label: '标签'
            }],
            optionValue: 'all',
            searchShow: false,
        }
    },
    methods: {
        async getNav () {
            let result = await getNav()
            this.list = result.data
            this.list.push({
                link: "/login",
                name: "Login",
            },{
                link: '',
                name: "Search",
            })
            
        },
        inputFocus (){
            console.log(this.search)
            document.onkeydown = ({key}) =>{
                if(key=='Enter'&&this.search!=''){
                    this.startSearch()
                }
            }
        },
        inputBlur(){
            document.onkeydown=null
        },
        startSearch(){
            this.$router.push({
                path: '/home',
                query: {
                    msg: this.search,
                    option: this.optionValue
                }
            })
            this.searchShow=false
        },
        searchClick(name){
            if(name=='Search'){
                this.searchShow=!this.searchShow
            }
        }
    },
    mounted () {
        this.getNav()
        let searchBtn=[...document.querySelectorAll('.tag-list li')].pop()
        console.log(searchBtn,'-----')
    },
    beforeDestroy(){
        document.onkeydown=null
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 3px 5px #ddd;
    z-index: 1000;
}
.header .left {
    width: 25%;
    float: left;
    height: 100%;
    text-align: center;
    box-shadow: 3px 0 5px #ddd;
}
.header .left h1 {
    font-size: 30px;
    white-space: pre-wrap;
}
.header .right {
    float: right;
    margin-right: 30px;
}
.header .right li {
    float: left;
    font-size: 18px;
    transition: 0.4s;
}
.header .right li:hover {
    background: rgba(2, 133, 21, 0.7);
    color: #fff;
}
.header .right li:hover a {
    color: #fff;
}
.header .right li a {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 20px;
}
.header .search {
    width: 300px;
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 10;
    box-shadow: 3px 3px 10px #ccc;
    padding: 5px 10px;
    display: flex;
}
.header .search .el-input{
    flex: 1;
    margin-right: 20px;
}
.header .search .el-input /deep/ .el-input__inner {
    transition: .2s;
    font-size: 18px;
}
.header .search  /deep/ .el-input__inner:focus {
    border: 1px solid rgb(2, 133, 21);
}
.header .search .el-select{
    width: 30%;
}
.header .search .el-select{
    width: 30%;
}
.el-scrollbar .selected{
    color: rgb(2, 133, 21)
}
.show-animation-enter-active, .show-animation-leave-active {
  transition: opacity .2s;
}
.show-animation-enter, .show-animation-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>