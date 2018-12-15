<template>
    <div>
        <div class="footer">
            <div class="links">
                <ul>
                    <li v-for="(item,key) in links" :key="key">
                        <a href="/"><i :class="'iconfont icon-'+item.name"></i></a>
                    </li>
                </ul>
            </div>
            <div class="cpright">COPYRIGHT © 8102 Y122972@GMAIL.COM. ALL RIGHTS RESERVED.</div>
        </div>
    </div>
</template>

<script>
    import {getLinks} from '../api'
    export default {
        data(){
            return {
                links: []
            }
        },
        methods: {
            async getLinks(){
                let result = await getLinks()
                this.links=result.data
                console.log(result.data)
            }
        },
        mounted(){
            this.getLinks()
        }
    }
</script>

<style scoped>
    .footer {
        height: 100px;
        margin: 40px auto 0;
        width: 100%;
        text-align: center;
    }
    .footer .links {
        width: 100%;
        height: 50px;
    }
    .footer ul {
    }
    .footer li {
        font-size: 30px;
        margin: 10px;
        display: inline-block;
        margin-top: 10px;
        
    }
    .footer li i {
        font-size: 30px;
        background: #000;
        color: #fff;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 3px 3px 10px #aaa;
        transition: .2s;
    }
    .footer li i:hover {
        background: rgb(2, 133, 21);
    }
    .footer .cpright {
        margin-top: 15px;
        font-size: 12px;
    }
</style>