<template>
    <el-container>
      <el-header class="header-path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>处理修理信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <main style="text-align:left;">
        <el-form :label-position="labelPosition" label-width="110px" :inline="true" :model="kcChange">
            <el-form-item label="修理日期">
                <el-input v-model="tableValue.date" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="设备名">
                <el-input v-model="tableValue.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="编号">
                <el-input v-model="tableValue.equid" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="修理厂家" label-width="110px">
                <el-input v-model="tableValue.repairfactory"></el-input>
            </el-form-item>

            <el-form-item label="修理费用" label-width="110px">
                <el-input v-model="tableValue.cost"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="责任人">
                <el-input v-model="tableValue.responsible" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="当前修理状态">
                <el-input v-model="tableValue.status" :disabled="true"></el-input>
            </el-form-item>

        </el-form>

        
        <el-form :inline="true" size="mini" style="text-align:center;">
            
            <el-button type="primary" @click="button_click('没修好')">没修好</el-button>
            <el-button type="primary" @click="button_click('已修好')">修理成功</el-button>
            <el-button type="primary" @click="button_click('return')">返回</el-button>
        </el-form>
      </main>
      
    <el-dialog
        title="报修申请提交确认"
        :visible.sync="dialogVisibleRepair"
        width="30%"
        :before-close="handleClose">
        <span>确认申请后会将报修申请发送到相关负责人！</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRepair = false">取 消</el-button>
            <el-button type="primary" @click="okRepair()">确 定</el-button>
        </span>
    </el-dialog>

    </el-container>
</template>

<script>

export default {
    name: "detail",
    created() {
        this.tableValue.date = this.dateFormatter(this.tableValue.date);
    },
    data() {
        return {
            tableValue: this.$route.params.val,
            dialogVisibleRepair: false,
            
            tstatus:'',
        };
    },
    methods: {
        button_click(kind){
            if(kind=='return'){
                this.$router.push({path: '/repairDev/list'});
                return;
            }else if(kind=='没修好'){
                if(!this.tableValue.repairfactory){
                    alert("修理工厂不能为空");
                    return;
                }
                if(!this.tableValue.cost){
                    alert("修理费用不能为空");
                    return;
                }
                this.tstatus="没修好";
                this.dialogVisibleRepair = true;
            }else if(kind=='已修好'){
                if(!this.tableValue.repairfactory){
                    alert("修理工厂不能为空");
                    return;
                }
                if(!this.tableValue.cost){
                    alert("修理费用不能为空");
                    return;
                }
                this.tstatus="已修好";
                this.dialogVisibleRepair = true;
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
        okRepair(){
            this.reData();
            this.dialogVisibleRepair = false;
            
            this.$router.replace({path: '/repairDev/list'});
        },
        reData(){
                var _this=this;
                //需要处理异步请求的问题
                this.axios.get('repair/modify?equId='+_this.tableValue.equid+'&id='+_this.tableValue.id+'&status='+_this.tstatus+'&repairFactory='+_this.tableValue.repairfactory+'&cost='+_this.tableValue.cost)
                    .then(function (response) {
                        _this.$message({
                            message: response.data,
                            type: 'success'
                            });
                        _this.$router.replace({path: '/repairDev/list'});
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