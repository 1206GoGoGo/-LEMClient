// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from  './router';
import axios from 'axios';
import VueAxios from 'vue-axios'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

//全局引入axios
//需要npm两个包axios和vue-axios
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
//axios相关配置 //更多配置待处理
axios.defaults.baseURL = 'http://localhost:8080/jwc/';

new Vue({
  el: '#app',
  router,
  components: { App },
  template:'<App/>'
});