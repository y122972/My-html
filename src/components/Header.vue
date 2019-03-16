<template>
    <div class="wrapper">
        <div class="header">
            <div class="left">
                <h1>{{blogName}}</h1>
            </div>
            <div class="right">
                <ul class="tag-list">
                    <li v-for="(item,key) in list"
                        :key="key">
                        <router-link :to="item.link">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
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
            list: []
        }
    },
    methods: {
        async getNav () {
            let result = await getNav()
            this.list = result.data
            this.list.push({
                link: "/login",
                name: "Login",
            })
        }
    },
    mounted () {
        this.getNav()
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
</style>