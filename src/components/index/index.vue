<template>
    <el-container>
      <el-aside width="300px">
         <Sider></Sider>
      </el-aside>
      <el-main>
        <MainPanel></MainPanel>
      </el-main>
    </el-container>
</template>

<script>
import Sider from '@/components/index/sider'
import MainPanel from '@/components/index/mainPanel'

export default {
    name:'index',
    data:function(){
        return{


        }
    },
    components:{
        Sider,
        MainPanel
    },



}
</script>
<style scoped>
.el-main{
  padding:0px;

}
</style>
