<template>
    <el-container>
      <el-header class="header-path">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>器材查看</el-breadcrumb-item>
          <el-breadcrumb-item>{当前器材</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <main style="text-align:left;">
        <el-form :label-position="labelPosition" label-width="110px" :inline="true" :model="kcChange">
            <el-form-item label="类别">
                <el-input v-model="tabledetail.category"></el-input>
            </el-form-item>
            <el-form-item label="设备名">
                <el-input v-model="tabledetail.name"></el-input>
            </el-form-item>
            <el-form-item label="编号">
                <el-input v-model="tabledetail.id" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="型号" label-width="110px">
                <el-input v-model="tabledetail.type"></el-input>
            </el-form-item>

            <el-form-item label="规格" label-width="110px">
                <el-input v-model="tabledetail.size"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="单价">
                <el-input v-model="tabledetail.price"></el-input>
            </el-form-item>


        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="购置日期">
                <el-input v-model="tabledetail.date"></el-input>
            </el-form-item>
            <el-form-item label="生成厂家">
                <el-input v-model="tabledetail.manufacturer"></el-input>
            </el-form-item>
            <el-form-item label="保质期">
                <el-input v-model="tabledetail.expirationdate"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">

            <el-form-item label="经办人">
                <el-input v-model="tabledetail.operator"></el-input>
            </el-form-item>
            <el-form-item label="设备当前状态">
                <el-input v-model="tabledetail.status"></el-input>
            </el-form-item>
        </el-form>
        
        <el-form :inline="true" size="mini" style="text-align:center;">
            <el-button type="primary" @click="button_click('repair')">报修</el-button>
            <el-button type="primary" @click="button_click('scrap')">报废</el-button>
            <el-button type="primary" @click="button_click('return')">返回</el-button>
        </el-form>
      </main>
    <div>待处理该设备的修理记录和报废记录</div>
      
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

    <el-dialog
        title="报废申请提交确认"
        :visible.sync="dialogVisibleScrap"
        width="30%"
        :before-close="handleClose">
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
        this.tabledetail.date = this.dateFormatter(this.tabledetail.date);
        this.tabledetail.expirationdate = this.dateFormatter(this.tabledetail.expirationdate);
    },
    data() {
        return {
            tabledetail: this.$route.params.val,

            dialogVisibleRepair: false,
            dialogVisibleScrap: false
        };
    },
    methods: {
        button_click(kind){
            if(kind=='return'){
                this.$router.push({path: '/manageDev/list'});
                return;
            }else if(kind=='repair'){
                this.dialogVisibleRepair = true;
            }else if(kind=="scrap"){
                this.dialogVisibleScrap = true;
            }
        },
        okRepair(){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('equipment/repair?id='+ _this.tabledetail.id +'&responsible='+ '责任人--待处理'+'&name='+_this.tabledetail.name )
                .then(function (response) {
                    alert(response.data);
                    if(response.data=='success'){
                        _this.$message({
                            message: '报修成功',
                            type: 'success'
                            });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
            this.dialogVisibleRepair = false;
        },      
      add0(m){return m<10?'0'+m:m },
      dateFormatter(date){
            var expirationdate = new Date(parseInt(date));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        okScrap(){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('equipment/scrap?id='+ _this.tabledetail.id +'&responsible='+ '责任人--待处理'+'&name='+_this.tabledetail.name)
                .then(function (response) {
                    alert(response.data);
                    if(response.data=='success'){
                        _this.$message({
                            message: '报修成功',
                            type: 'success'
                            });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
            this.dialogVisibleScrap = false;
        },


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