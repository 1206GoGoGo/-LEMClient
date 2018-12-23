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
                <el-input v-model="kcChange"></el-input>
            </el-form-item>
            <el-form-item label="设备名">
                <el-input v-model="kcChange"></el-input>
            </el-form-item>
            <el-form-item label="编号">
                <el-input v-model="kcChange" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="修理厂家" label-width="110px">
                <el-input v-model="kcChange"></el-input>
            </el-form-item>

            <el-form-item label="修理费用" label-width="110px">
                <el-input v-model="kcChange.xf"></el-input>
            </el-form-item>

        </el-form>
        <el-form :inline="true" label-width="110px">
            <el-form-item label="责任人">
                <el-input v-model="kcChange.sjxs2"></el-input>
            </el-form-item>
            <el-form-item label="修理状态">
                <el-input v-model="kcChange.kwxs"></el-input>
            </el-form-item>

        </el-form>

        
        <el-form :inline="true" size="mini" style="text-align:center;">
            <el-button type="primary" @click="button_click('repair')">修理成功</el-button>
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
    name: "detail",

    data() {
        return {
            labelPosition: 'right',
            kcChange: this.$route.params.val,
            dialogVisibleRepair: false,
            dialogVisibleScrap: false
        };
    },
    methods: {
        button_click(kind){
            if(kind=='return'){
                this.$router.push({path: '/repairDev/list'});
                return;
            }else if(kind=='repair'){
                this.dialogVisibleRepair = true;
                //this.$router.replace({name: 'xqdmRightForm',
                //    params:{ val:row ,change_id: row.xqdm+new Date().getSeconds(), type: 'change'}});
                    ////通过改变每次的参数解决路由跳转失效的问题
            }else if(kind=="scrap"){
                this.dialogVisibleScrap = true;
            }
        },
        okRepair(){
            this.dialogVisibleRepair = false;
            this.$message({
                message: '报修成功',
                type: 'success'
                });
        //    this.$router.replace({name: 'xqdmRightForm',
        //    params:{ val:row ,change_id: row.xqdm+new Date().getSeconds(), type: 'change'}});
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