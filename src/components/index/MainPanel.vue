<template>
    <el-container class="main-panel" style="left:0;">
        <el-main>
            <router-view>
            </router-view>
        </el-main>
    </el-container>
</template>

<script>
//主界面
export default {
    name:"mainPanel",
    created(){

        //判断是否登陆状态
        this.$router.push({path:'/user/login'});
    }
}
</script>

<style scoped>
.main-panel{
    position: absolute;
    top:0px;
    bottom:0px;
    right:0px;
    left:250px;
    overflow: auto;
}


</style>
