<template>
    <div class="login-bg">

            <div class="center-panel">
                <div class="center-inner-left"></div>
                <div class="center-inner-right">
                    <div class="sys-title">实验室器材管理系统</div>
                    <div class="form-area">
                        <el-form :rules="rules">
                            <el-form-item>
                                <el-col :span="20" :offset="2">
                                    <el-input v-model="user.username" placeholder="请输入用户名">
                                        <img width="20" style="margin-top:10px;padding-right:10px;" slot="prefix" src="../../assets/user-logo.png">
                                    </el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="20" :offset="2">
                                    <el-input type="password" v-model="user.password" placeholder="请输入密码">
                                        <img width="20" style="margin-top:10px;padding-right:10px;" slot="prefix" src="../../assets/password-logo.png">
                                    </el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="8" :offset="2" >以何种身份登录？</el-col>
                                <el-col :span="12" style="height:40px;line-height:40px;padding-top:10px;    text-align: right;">
                                    <el-switch
                                        style="display: block"
                                        v-model="level"
                                        active-color="#13ce66"
                                        inactive-color="#409eff"
                                        active-text="普通用户"
                                        active-value="2"
                                        inactive-text="管理员"
                                        inactive-value="1">
                                    </el-switch>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="6" :offset="2">
                                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                                </el-col>
                                <el-col style="text-align:right;" :span="10" :offset="4"> 没有账号?去<span class="go-reg-text" >注册</span></el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="20" :offset="2">
                                    <el-button  type="primary" @click="login">登录</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>


            </div>




    </div>
</template>
 
<script>
export default {
    name:"login",
    data:function(){
        return{
            level:'1',
            remember:false,
            user:{
                username:"",
                password:"",
                level:2
            }

        }
    },
    methods:{
        login:function(){

            var _this=this;
            this.user.level=parseInt(this.level);
            this.axios({
                method:'post',
                url:'user/login',
                data:_this.user,
            })
            .then(function(rep){

                if(rep.data==="success")
                {
                    _this.$message({
                        message: '登录成功，即将进入系统',
                        type: 'success',
                        showClose:true,
                    });
                    _this.$store.commit('successLogined',_this.user);

                    //延迟执行跳转
                    setTimeout(function(){_this.$router.push({path:'/user/loginsuccess'});},1000);
                }
                else
                {
                     _this.$message({
                        message: '登录失败，请检查用户名或密码',
                        type: 'error',
                        duration:6000,
                        showClose:true,
                    });

                }

            })
            .catch(function(e){
                 _this.$message({
                        message:e.message,
                        type: 'error',
                        duration:4000,
                        showClose:true,
                    });

            })



            
        }

    }     
} 
</script>
<style scoped>

    .login-bg{
        border:1px solid red;
        height:100%;
        width:100%;
        background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
    }

    .center-panel{
        position: relative;
        top:50%;
        width:800px;
        height:450px;
        margin:0 auto;
        margin-top:-225px;
        border-radius: 14px;
        background-color:#fff;
        box-shadow: 0 3px 4px rgba(10,16,20,.24),0 0 4px rgba(10,16,20,.12);
        overflow: hidden;
    }
    .center-panel>div{
        float:left;
        width:50%;
        height:100%;

    }
     .center-inner-left{
         background-color:#f2f2f2;
         background: url('../../assets/login-bg.png');
         background-size:400px 450px;
         background-position: 0px -70px;
     }
    .center-inner-right{

    }
    .sys-title{
        height:100px;
        line-height:100px;
        font-size:23px;
    }
    .el-button{
        width:100%;
        font-size:17px;
        letter-spacing: 1em;
    }
    .go-reg-text{
        padding-left: 5px;
        letter-spacing: 1px;
        font-size:14px;
        color:#409eff;
        cursor: pointer;
    }
    .go-reg-text:hover{
        text-decoration: underline;
        font-weight:bold;
    }
</style>