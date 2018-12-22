<template>
  <div id="app">
    <el-container>
      <el-aside width="300px">
         <Sider></Sider>
      </el-aside>
      <el-main>
        <MainPanel></MainPanel>
      </el-main>
    </el-container>
   
  </div>
</template>
<script>
import Sider from '@/components/index/sider'
import MainPanel from '@/components/index/mainPanel'
export default {
  name: 'index',
  data:function(){
    return {
    
    }
  },

  components:{
    Sider,
    MainPanel
  },

beforeCreate:function(){
  //用来将html和body节点高度铺满整个屏幕
  document.querySelector('html').setAttribute('style','height:100%;');
  document.querySelector('body').setAttribute('style','height:100%; margin:0px;padding:0px;');
}
}
</script>

<style scoped>
*{
  margin:0px;
  padding:0px;
}
#app {
  font-family:'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height:100%;
}

.el-main{
  padding:0px;

}

</style>
