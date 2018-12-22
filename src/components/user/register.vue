<template>
<!--由于路径原因不能直接加背景图片 用note加入背景图-->
<div class = "note" :style = "note">
 
<!--login框，表单+tab标签页的组合-->
<div class = "loginFrame">
    <!--表单组件放在外面，标签栏在里面-->
    <el-form ref = "AccountForm" :model = "AccountForm"   rules = "rules"  class = "demo-ruleForm login-container">
        <div class="title">实验室设备管理系统-注册</div>
        <div class = "formGroup">
            <el-form-item  label = "账  号：" prop = "user" >
                <el-input type = "text"  v-model="Account" auto-complete = "off" placeholder = "请输入您的账号，以备登陆使用" class = "form-control" ></el-input>
            </el-form-item> 
            <el-form-item label = "密  码：" prop = "password" class = "form-inline">
                <el-input type = "password" v-model="Password" auto-complete = "off" placeholder = "请输入一个密码" class = "form-control" ></el-input>
            </el-form-item>
            <el-form-item label = "重复密码：" prop = "password" class = "form-inline">
                <el-input type = "password" v-model="Password" auto-complete = "off" placeholder = "请再次输入密码" class = "form-control" ></el-input>
            </el-form-item>
            <el-form-item label = "身 份：" prop = "password" class = "form-inline">
                <el-radio v-model="radio" label="1">管理员</el-radio>
                <el-radio v-model="radio" label="2">普通用户</el-radio>
            </el-form-item>
        </div>
        <!-- <div class = "remFor">
                 <el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox> -->
            <!-- <a href ="" class = "forget">忘记密码？</a>
        </div> -->
        <div class = "formButton">
            <el-form-item style = "width:100%;">
                <el-button type = "primary" style = "width:45%; float:left" @click="register">注册</el-button>
                <el-button type = "primary" style = "width:45%; float:right" @click="cancel">取消</el-button>
            </el-form-item>
        </div>
    </el-form>
</div>
</div>
 
</template>
 
<script>
export default {
        name: '登录',
        data() {
            return {
                login: false,
                radio: '1',
                //背景图
                note: {
                    position:"absolute",
                    top:"0px",
                    left:"0px",
                    width: "100%",
                    height:"1000px",
                    backgroundImage: "url(" + require("../../assets/beijing1.jpg") + ")",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                },
                account: {
                    username:'',
                    password:'',
                },
                rules: {
                    username:[
                        {required: true, message: '请输入账号',trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true,message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false          
            }; 
        },      
        methods:{
            /*注册*/
            register(){

                this.$router.push({path: '/user/register'});
            },
            /*登陆*/
            cancel(){
               this.$router.push({path: '/user/login'});
            }
        },
} 
</script>
 
<style>

.title{
    font-size:x-large;
    color: #00808c;
   
}
.formGroup{
    margin: 20px auto;
}

.login-container {
    
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 40px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.7)
 
    ;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label{
    width:100px;
    font-size:x-large;
    text-align:left;
    color: #00808c;
    }
 
.form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
 
}
.remember{
    width:250px;
    text-align:left;
}
.forget{
    width:500px;
    text-align:right;
    font-size:14px;
    font-family:PingFang SC;
    
}
.remFor{
    margin-bottom: 10px;
    padding-bottom: 10px;
}
.tabsUser{
    display: inline-block;
    margin-left: 0px;
    margin-right:0px;
    text-align:center;
    font-size:25px;
}
 
</style>