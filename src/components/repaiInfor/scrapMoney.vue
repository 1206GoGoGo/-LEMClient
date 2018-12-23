<template>
    <el-container>
      <el-header class="header-path" style="height:40px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>信息统计</el-breadcrumb-item>
          <el-breadcrumb-item>报废信息统计</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
    <div style="margin-bottom:10px; text-align:left;">
        <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
        </el-date-picker>
        <el-input
            style="width:180px"
            placeholder="请输入设备名称"
            v-model="search.key"
            clearable>
        </el-input>
        <!--下拉列表框 结束-->
        <el-button type="primary" plain>查询</el-button>
        <!-- <div style="display:inline-block;">
            <el-alert title="通过选择设备状态或者设备关键字查询相关信息" type="success"></el-alert>
        </div> -->
        
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
            label="设备编号"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqmc"
            label="设备名称"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqdm"
            label="报废数量"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqjp"
            label="报废金额"
            sortable>
        </el-table-column>
        <el-table-column
            prop="zrr"
            label="责任人"
            sortable>
        </el-table-column>
        <el-table-column
            prop="xqmc"
            label="报废日期"
            sortable>
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
            ststatus: [{label:'已修好', value:'已修好'},{label:'待修理', value:'待修理'}],
            dialogVisibleRepair: false,
            dialogVisibleScrap: false,
            search:{
                status:'',
                key:''
            },
            tableData:[],


        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: ''


        
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
      },
      okRepair(){
            this.dialogVisibleRepair = false;
            this.$message({
                message: '报修成功',
                type: 'success'
                });
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
                //alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
      }
    }
}
</script>

<style scoped></style>