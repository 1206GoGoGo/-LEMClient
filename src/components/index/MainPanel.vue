<template>
    <el-container class="main-panel" style="left: 30;" >
        <el-main>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
//主界面
export default {
    name:"mainPanel",
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

.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .2s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .2s;
}
</style>
