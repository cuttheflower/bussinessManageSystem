<template>
    <div class="home_container">
        <el-button @click="logOut">exit</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        logOut() {
            sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
.home_container {

}
</style>