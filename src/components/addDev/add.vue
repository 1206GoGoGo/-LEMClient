<template>
    <el-container>
      <el-header class="header-path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>申请设备</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <main style="text-align:left;">
        <el-form :label-position="labelPosition" label-width="110px" :inline="true" :model="kcChange">
            <el-form-item label="类别">
                <el-input v-model="addBuy.category"></el-input>
            </el-form-item>
            <el-form-item label="设备名">
                <el-input v-model="addBuy.name"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true">
            <el-form-item label="型号" label-width="110px">
                <el-input v-model="addBuy.type"></el-input>
            </el-form-item>

            <el-form-item label="规格" label-width="110px">
                <el-input v-model="addBuy.size"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="单价">
                <el-input v-model="addBuy.price"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="addBuy.count"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="生成厂家">
                <el-input v-model="addBuy.manufacturer"></el-input>
            </el-form-item>
            <el-form-item label="保质期">
                <el-input v-model="addBuy.expirationdate"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">

            <el-form-item label="经办人">
                <el-input v-model="addBuy.operator"></el-input>
            </el-form-item>

        </el-form>
        
        <el-form :inline="true" size="mini" style="text-align:center;">
            <el-button type="primary" @click="button_click('submit')">提交</el-button>
            <el-button type="primary" @click="button_click('return')">返回</el-button>
        </el-form>
      </main>



    </el-container>
</template>

<script>

export default {
//上面选修课程性质用的都是名称！！！！！！！！！！-----------json数据中是名称，数据库中存的什么待处理
    name: "add",

    data() {
        return {
            kcChange:{},
            addBuy: {
                status: '待处理'
            }
        };
    },
    methods: {
        button_click(kind){
            if(kind=='submit'){
                this.addData();
                return;
            }else if(kind=='return'){
                this.$router.push({path:'/addDev/list'});
                return;
            }
        },
        addData(){
            var _this=this;
            //需要处理异步请求的问题

            this.axios.post('buy/add', _this.addBuy)
                .then(function (response) {
                    //将response获得的数据进行处理
                    //将获取到的数据以数组形式传递出去
                    alert(response.data);
                    _this.$router.push({path:'/addDev/list'});
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
        }

    }
};
</script>

<style scoped>
.el_select {
    width:150px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 8px;
}
.el-form-item {
    margin-bottom: 8px;
}
</style>