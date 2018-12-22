<template>
    <el-container>
      <el-header class="header-path" style="height:40px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>申请设备列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
    <div style="margin-bottom:10px; text-align:left;">
        <!--下拉列表框 开始-->
        <el-select style="width:150px" v-model="search.status" clearable placeholder="请选择设备状态">
            <el-option v-for="item in ststatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input
            style="width:180px"
            placeholder="请输入查询信息"
            v-model="search.key"
            clearable>
        </el-input>
        <!--下拉列表框 结束-->
        <el-button type="primary" plain>查询</el-button>
        <div style="display:inline-block;"><el-alert title="通过选择设备状态或者设备关键字查询相关信息" type="success"></el-alert></div>
        
    </div>
    <el-table
        stripe
        border
        highlight-current-row
        @row-click="handleCurrentChange"
        height="350px"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'xqdm', order: 'descending'}">
        <el-table-column
            prop="xqdm"
            label="类别"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqmc"
            label="设备名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqdm"
            label="型号"
            sortable
            >
        </el-table-column>
        <el-table-column
            prop="xqdm"
            label="规格"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqmc"
            label="单价"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqjp"
            label="数量"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqjp"
            label="生产厂家"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqmc"
            label="保质期"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqjp"
            label="经办人"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqjp"
            label="状态"
            sortable>
        </el-table-column>       
        <el-table-column label="操作" width="160px">

            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <el-row>
                        <el-col :span="12">
                            <el-button
                            size="mini"
                            @click="handleRepair(scope.$index, scope.row)">同意购买</el-button></el-col>
                        <el-col :span="12">
                            <el-button
                            size="mini"
                            @click="handleRepair(scope.$index, scope.row)">已购买</el-button></el-col>
                        <el-col :span="12">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="toDetail(scope.$index, scope.row)">拒绝购买</el-button></el-col>
                    </el-row>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">详情</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
    

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
    mounted(){
        this.getData(); //获取数据前先取数据
    },
    data() {
        return {
            ststatus: [{label:'待处理', value:'待处理'},{label:'待购买', value:'待购买'},
                {label:'已购买', value:'已购买'},{label:'拒绝', value:'拒绝'}],
            dialogVisibleRepair: false,
            dialogVisibleScrap: false,
            search:{
                status:'',
                key:''
            },
            tableData:[],
        }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleRepair(index, row) {
        this.dialogVisibleRepair = true;
        //this.$router.replace({name: 'xqdmRightForm',
        //    params:{ val:row ,change_id: row.xqdm+new Date().getSeconds(), type: 'change'}});
            ////通过改变每次的参数解决路由跳转失效的问题
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
      handleScrap(index, row) {
        this.dialogVisibleScrap = true;
      },
      okScrap(){
          this.dialogVisibleScrap = false;
          this.$message({
                message: '申请成功',
                type: 'success'
                });
      },
      toDetail(index, row) {
            this.$router.push({path: '/manageDev/detail',
                params:{ val:row ,id: row.xqdm+new Date().getSeconds(), type: 'change'}});
      },
      //将数据库存储的状态数值，格式化为汉字
      stateFormatter(row,column){
        let state = row.state;
        if(state === '0'){return '是'} else {return '否'}
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getData(){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('SysXq/getAll')
                .then(function (response) {
                    //将response获得的数据进行处理
                    //将获取到的数据以数组形式传递出去
                    var dataList=response.data;
                    _this.tableData=dataList;
                })
                .catch(function (error) {
                    console.log(error);
                    _this.tableData=[{xqdm:"12"}];
                alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
      }
    }
}
</script>

<style scoped></style>