<template>
<div class="sider" style="">
    <div class="title-area">
        <img class="whut-logo" src="../../assets/whut-logo.png">
        <span class="whut-title-area">
            <img src="../../assets/whut-title.png" class="whut-title-logo">
            <div>实验器材管理系统</div>
        </span>
    </div>
<!-- 00808c -->
    
   <el-menu  class="" @select="handleSelect"  :unique-opened=true  background-color="#004d99" text-color="#fff" active-text-color="#fff">
      


       <el-submenu index=1>
            <template   slot="title"><i class="el-icon-setting"></i>设备申请管理</template>   
                <el-menu-item index="1-1">- -设备申请</el-menu-item>
                <el-menu-item index="1-2">- -申请记录</el-menu-item>
                <!--el-menu-item index="1-3">- -处理申请</el-menu-item-->
       </el-submenu>

        <el-submenu index="2">
            <template   slot="title"><i class="el-icon-menu"></i>现存设备管理</template>  
            <el-menu-item index="2-1">- -设备列表</el-menu-item>
        </el-submenu>
        
        <el-submenu index="3">
            <template   slot="title"><i class="el-icon-menu"></i>设备修理管理</template>  
            <el-menu-item index="3-1">- -修理记录</el-menu-item>
            <!--el-menu-item index="3-2">- -设备报修</el-menu-item-->  <!--跳转到现存设备列表进行处理-->
            <!--el-menu-item index="3-3">- -更改修理进度</el-menu-item-->            
       </el-submenu>

        <el-submenu index="4">
            <template  slot="title"><i class="el-icon-menu"></i>报废设备管理</template>  
            <el-menu-item index="4-1">- -报废记录</el-menu-item>
            <!--el-menu-item index="4-2">- -申请报废</el-menu-item-->  <!--跳转到现存设备列表进行处理-->
            <!--el-menu-item index="4-3">- -报废审批</el-menu-item-->
       </el-submenu>

        <el-submenu index="6">
            <template   slot="title"><i class="el-icon-menu"></i>信息统计</template>  
            <el-menu-item index="5-1">- -修理费用统计</el-menu-item>
            <el-menu-item index="5-2">- -报废费用统计</el-menu-item>
        </el-submenu>

   </el-menu>
</div>
</template>

<script>
//首页侧边栏模块
export default {
    name:"sider",
    data:function(){
        return {
        }
    },

    methods:{
        //路由跳转处理
        handleSelect:function(index,indexpath){
            var locthis=this;
            
          
            switch(index)
            {
                //通过index来控制路由跳转

             

                
                case "1-1":locthis.$router.push({path:'/addDev/add'});break;

                case "1-2":locthis.$router.push({path:'/addDev/list'});break;

                case "2-1":locthis.$router.push({path:'/manageDev/list'});break;


                case "3-1":locthis.$router.push({path:'/repairDev/list'});break;
                //case "3-2":locthis.$router.push({path:'/manageDev/list'});break;
                //case "3-3":locthis.$router.push({path:'/repairDev/isRepair'});break;

                case "4-1":locthis.$router.push({path:'/scrapDev/list'});break;
                //case "4-2":locthis.$router.push({path:'/manageDev/list'});break;
                //case "4-3":locthis.$router.push({path:'/scrapDev/isScrap'});break;
                
                case "5-1":locthis.$router.push({path:'/repaiInfor/repaiMoney'});break;
                case "5-2":locthis.$router.push({path:'/repaiInfor/scrapMoney'});break;
                default:console.log("跳转错误");
            }
        }

    },
    computed:{
        getUsername(){
            return this.$store.state.user.username;
        },
        getNickName(){
            return this.$store.state.user.nickname;
        },
        getLevel(){
            return this.$store.state.user.level;
        },
        isLogined(){
            return this.$store.state.isLogined;
        },
    }
}
</script>

<style scoped>
    .sider{
        display: inline-block;
        position:absolute;
        min-width:250px;
        
        top:0px;
        left:0px;
        bottom:0px;
        background-color:#004d99;
    }
    .sider .title-area{
        height:84px;
    }
    .whut-logo{
        float:left;
        height:60px;
        margin-left:10px;
    }
    .whut-title-area{
        float:right;
        width:160px;
        margin-right:10px;
    }
    .whut-title-area>div{
        padding-top: 5px;
        font-size: 14px;
        letter-spacing: 1px;
    }
    .whut-title-logo{
        display: inline-block;
        margin-top:7px;
        width:130px;

    }
    .el-menu{
        text-align: left;
        border-right:0px;
    }
    .el-menu.el-submenu{
        background-color:white;
    }

    .el-menu-item.is-active{
        background-color:#409EFF !important;
    }
  
   .el-submenu{
       position: relative;
   }
    .el-menu .el-submenu:after{
        content:" ";
        z-index: 10;
        position: absolute;
        width:200px;
        height:0px;
        bottom:0px;
        left:25px;
       
        border-bottom:0px groove #95989d;
    }
    .el-menu-item:hover{
        background-color: #409EFF  !important;
    }

    .el-submenu__title i{
        color:#fff !important;
    }
    .title-area{
        color:#fff;
    }
</style>

