<template>
    <el-container>
      <el-header class="header-path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>审批报废设备请求</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <main style="text-align:left;">
        <el-form  label-width="110px" :inline="true" >
            <el-form-item label="报废日期">
                <el-input v-model="tableValue.date" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备名">
                <el-input v-model="tableValue.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input v-model="tableValue.equid" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="责任人" label-width="110px">
                <el-input v-model="tableValue.responsible" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="当前审批状态" label-width="110px">
                <el-input v-model="tableValue.status" :disabled="true"></el-input>
            </el-form-item>

        </el-form>


        
        <el-form :inline="true" size="mini" style="text-align:center;">
            
            <el-button type="primary" @click="button_click('审批拒绝')">拒绝报废</el-button>
            <el-button type="primary" @click="button_click('审批通过')">同意报废</el-button>
            <el-button type="primary" @click="button_click('return')">返回</el-button>
        </el-form>
      </main>

    <el-dialog
        title="报废申请提交确认"
        :visible.sync="dialogVisibleScrap"
        width="30%">
        <span>确认申请后会将报废申请发送到相关负责人！<br>管理人员会对报废进行审核！</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleScrap = false">取 消</el-button>
            <el-button type="primary" @click="okScrap()">确 定</el-button>
        </span>
    </el-dialog>



    </el-container>
</template>

<script>

export default {
//上面选修课程性质用的都是名称！！！！！！！！！！-----------json数据中是名称，数据库中存的什么待处理
    name: "detail",
    created() {
        this.tableValue.date = this.dateFormatter(this.tableValue.date);
    },
    data() {
        return {
            tableValue: this.$route.params.val,
            dialogVisibleScrap: false,
            tstatus : ''
        };
    },
    methods: {
        button_click(kind){
            if(kind=='return'){
                this.$router.push({path: '/scrapDev/list'});
                return;
            }else if(kind=="审批拒绝"){
                this.tstatus="审批拒绝";
                this.dialogVisibleScrap = true;
            }else if(kind=="审批通过"){
                this.tstatus="审批通过";
                this.dialogVisibleScrap = true;
            }
        },
            add0(m){return m<10?'0'+m:m },
      dateFormatter(date){
            var expirationdate = new Date(parseInt(date));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
        okScrap(){
            this.dialogVisibleScrap = false;
            this.reData();
        },
        reData(){
                var _this=this;
                //需要处理异步请求的问题
                this.axios.get('scrap/modify?equId='+_this.tableValue.equid+'&id='+_this.tableValue.id+'&status='+_this.tstatus)
                    .then(function (response) {
                        _this.$message({
                            message: response.data,
                            type: 'success'
                            });
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