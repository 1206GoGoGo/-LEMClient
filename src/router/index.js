//路由配置文件
import Vue from 'vue'
import Router from 'vue-router'

import user from './user.js'
import addDev from './addDev.js'
import manageDev from './manageDev.js'
import repairDev from './repairDev.js'
import scrapDev from './scrapDev.js'
import repaiInfor from './repaiInfor.js'



Vue.use(Router);


export default new Router({
    mode:'hash',
    routes:[].concat(user,addDev,manageDev,repairDev,scrapDev,repaiInfor)
})