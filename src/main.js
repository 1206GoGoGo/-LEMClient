// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from  './router';
import axios from 'axios';
import VueAxios from 'vue-axios'
import store from './store'
import VCharts from 'v-charts'
console.log(store.state.isLogined)
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

//全局引入axios
//需要npm两个包axios和vue-axios
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(VueAxios,axios);
//axios相关配置 //更多配置待处理
axios.defaults.baseURL = 'http://localhost:8080/lems/';
//axios.defaults.baseURL = 'http://10.139.51.112:8080/lems/';

Vue.filter('UserRoleFilter', function (value) {
  if (value===1)
      value = "管理员";
  else{
      value ="一般用户";
  };
  return value;
})

router.beforeEach(function(to,from,next){
  console.log("aaaaaaaaaaa"+to.path+"------"+store.state.isLogined);
  if(to.meta.loginRequired)
  {
    if(store.state.isLogined)
        next();
    else
      next({path:'/user/login'});
  }
  else
    {
        next();
    }

})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template:'<App/>'
});

