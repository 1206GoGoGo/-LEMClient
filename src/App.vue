<template>
  <div id="app">
  
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
  </div>
</template>
<script>

export default {
  name: 'app',
  data:function(){
    return {
    
    }
  },

  components:{

  },
mounted:function(){

  var user= JSON.parse(window.localStorage.getItem("user"));
  if(user){
     this.$store.commit('successLogined',user);
  }

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

  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height:100%;
}

.el-main{
  padding:0px;

}

.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
