import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={

    user:{
        username:'',
        level:0,
        nickname:'',

    },
    isLogined:false,
}


const mutations={
    
    successLogined(state,user){
        state.user.username=user.username;
        state.user.level=user.level;
        state.user.nickname=user.nickname;
        state.isLogined=true;
    },
    logOut(state){
        state.isLogined=false;
        state.user.username='';
        state.user.nickname='';
        state.user.level=0;
    }

}


const store = new Vuex.Store({
    state:state,
    mutations:mutations,

});
 
export default store;