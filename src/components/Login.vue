<template>
    <div class="main">
        
        <el-form label-position="right" label-width="80px" :model="loginData">
            <el-form-item label="用户名">
                <el-input v-model="loginData.name" @focus="tipMsg=''"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginData.pwd" type="password" @focus="tipMsg=''"></el-input>
            </el-form-item>
        </el-form>
        <div class="buttonWrapper">
            <el-button @click="loginHandle" :disabled="cantClick" class="button" type="success" round>登 录</el-button>
        </div>
        <div class="tipMsg">
            <p class="msg">{{ tipMsg }}</p>
        </div>
        <Loading></Loading>
    </div>
</template>

<script>
    import {login, getPermission} from '../api'
    import Loading from './Loading2.vue'
    import '../assets/js/md5'
    export default {
        data() {
            return {
                loginData: {
                    name: '',
                    pwd: '',
                },
                tipMsg: '',
            }
        },
        methods: {
            async loginHandle() {
                console.log(this.loginData.name,this.loginData.pwd)
                if(!this.loginData.name||!this.loginData.pwd)
                this.tipMsg='Logining...'
                let data={
                    name: this.loginData.name,
                }
                let pwd = this.loginData.pwd
                this.loginData.pwd = ''
                let res = await login(data)
                console.log(res.data.rand + pwd)
                data.pwd = md5(res.data.rand + pwd)
                res = await login(data)
                if(!res.data.err) {
                    this.$router.go(-1)
                } else {
                    this.tipMsg = res.data.msg
                }
                res = await getPermission() 
                console.log(res, 'permission')
            }
        },
        computed: {
            cantClick() {
                if(!this.loginData.name||!this.loginData.pwd)
                    return true
                return false
            }
        },
        components: {
            Loading,
        },
        beforeCreate() {
            console.log('beforeCreate data = ' + this.loginData)
            console.log(this._data)
        },
        created() {
            console.log('beforeCreate data = ' + this.loginData)
            console.log(this._data)
        },
        beforeMount() {
            console.log('beforeMount: ')
            console.log('this.$el = ' + this.$el)
            console.log('')
        },
        mounted() {
            console.log('mounted: ')
            console.log('this.$el = ' + this.$el)
            console.log('')
        },
    }
</script>

<style scoped>
 .main /deep/{
    width: 30%;
    margin: 0 auto;
    min-width: 400px;
    margin-top: 100px;
    border: 1px solid rgb(2,133,21);
    border-radius: 10px;
    padding: 50px;
}

.buttonWrapper {
    width: 100%;
    margin-top: 40px;
}
.button {
    margin: 0 auto;
    display: block;
}
.tipMsg {
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: rgb(2,133,21);
    margin-top: 10px;

}

</style>