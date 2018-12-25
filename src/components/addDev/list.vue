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
        <el-button type="primary" plain @click="getData()">查询</el-button>
        <div style="display:inline-block;"><el-alert title="通过选择设备状态或者设备关键字查询相关信息" type="success"></el-alert></div>
        
    </div>
    <el-table
        stripe
        border
        highlight-current-row
        @row-click="handleCurrentChange"
        height="550px"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'xqdm', order: 'descending'}">
        <el-table-column
            prop="id"
            label="申请编号"
            sortable>
        </el-table-column>
        <el-table-column
            prop="category"
            label="类别"
            sortable>
        </el-table-column>
        <el-table-column
            prop="name"
            label="设备名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="type"
            label="型号"
            sortable
            >
        </el-table-column>
        <el-table-column
            prop="size"
            label="规格"
            sortable>
        </el-table-column>
        <el-table-column
            prop="price"
            label="单价"
            sortable>
        </el-table-column>
        <el-table-column
            prop="count"
            label="数量"
            sortable>
        </el-table-column>
        <el-table-column
            prop="manufacturer"
            label="生产厂家"
            sortable>
        </el-table-column>
        <el-table-column
            :formatter="expirationdateFormatter"
            width="120px"
            prop="expirationdate"
            label="保质期"
            sortable>
        </el-table-column>
        <el-table-column
            prop="operator"
            label="经办人"
            sortable>
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            sortable>
        </el-table-column>       
        <el-table-column label="操作" width="160px">

            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <el-row>
                        <el-col :span="8">
                            <el-button size="mini" type="primary" @click="handleState('待购买', scope.row)">同意购买</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button size="mini" type="primary"  @click="handleState('已购买', scope.row)">已购买</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button size="mini" @click="handleState('拒绝', scope.row)">拒绝购买</el-button>
                        </el-col>
                    </el-row>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">详情</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
    

    <el-dialog
        title="采购状态修改确认"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确认修改后设备采购状态将会发送给相关负责人！</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false ;">取 消</el-button>
            <el-button type="primary" @click="okRepair()">确 定</el-button>
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
            ststatus: [
                {label:'全部', value:'0'},
                {label:'待处理', value:'待处理'},
                {label:'待购买', value:'待购买'},
                {label:'已购买', value:'已购买'},
                {label:'拒绝', value:'拒绝'}
            ],
            dialogVisible: false,
            search:{
                status:'',
                key:''
            },
            changes:{
                state:'',
                id:''
            },
            tableData: [],
        }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      add0(m){return m<10?'0'+m:m },
      expirationdateFormatter(row,column){
            var expirationdate = new Date(parseInt(row.expirationdate));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleState(state, row) {
        this.dialogVisible = true;
        this.changes.state = state;
        this.changes.id = row.id;
      },
      okRepair(){
            this.dialogVisible = false;
            this.modifyStatus(this.changes.state, this.changes.id);
            this.$message({
                message: '提交成功',
                type: 'success'
            });
        //    this.$router.replace({name: 'xqdmRightForm',
        //    params:{ val:row ,change_id: row.xqdm+new Date().getSeconds(), type: 'change'}});
      },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
      modifyStatus(status, id){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('buy/modify?id= '+id+'&status='+status)
                .then(function (response) {
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
      },
      getData(){
            if(!this.search.status){
                var status = '0';
            }else{ var status =  this.search.status;}
            if(!this.search.key){
                var key = '0';
            }else{ var key = this.search.key;}
            
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('buy/find?status='+status+'&info='+key)
                .then(function (response) {
                    //将response获得的数据进行处理
                    //将获取到的数据以数组形式传递出去
                    var dataList=response.data;
                    _this.tableData=dataList;

                    _this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
      }
    }
}
</script>

<style scoped></style>