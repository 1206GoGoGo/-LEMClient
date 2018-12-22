<template>
    <el-container class="main-panel">
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
    data:function(){
        return {


        }
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
