<template>
    <div class="main">
        <AppHeader></AppHeader>
        <div class="main">
            <div class="content"
                 :style="'minHeight: '+mainMinHeight+'px'">
                <router-view></router-view>
            </div>
            <AppFooter></AppFooter>
        </div>
    </div>
</template>

<script>
    import AppHeader from '../components/Header'
    import AppFooter from '../components/Footer'
    export default {
        data() {
            return {
                mainMinHeight: null,
            }
        },
        components: {
            AppHeader,
            AppFooter
        },
        mounted () {
            this.mainMinHeight = window.innerHeight - this.$store.state.headerHeight
        }
    }
</script>

<style scoped>
.main {
    margin-top: 80px;
}
</style>