<template>
    <el-container>
        <el-header class="header-path" style="height:40px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设备列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
    <div ref="elememt" style="margin-bottom:10px; text-align:left;">
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
        :height="tableHeight"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'id', order: 'descending'}">
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
            prop="id"
            label="编号"
            sortable
            >
        </el-table-column>
        <el-table-column
            prop="type"
            label="型号"
            sortable>
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
            :formatter="buydateFormatter"
            prop="date"
            width="120px"
            label="购置日期"
            sortable>
        </el-table-column>
        <el-table-column
            prop="manufacturer"
            label="生产厂家"
            sortable>
        </el-table-column>
        <el-table-column
            :formatter="expirationdateFormatter"
            prop="expirationdate"
            width="120px"
            label="保质期"
            sortable>
        </el-table-column>
        <el-table-column
            :formatter="stateFormatter"
            prop="operator"
            label="经办人"
            sortable>
        </el-table-column>
        <el-table-column
            :formatter="stateFormatter"
            prop="status"
            label="设备当前状态"
            sortable>
        </el-table-column>
        <el-table-column label="操作" width="160px">

            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <el-row>
                        <el-col :span="8"><el-button
                            size="mini"
                            @click="handleRepair( scope.row)">报修</el-button></el-col>
                        <el-col :span="8"><el-button
                            size="mini"
                            type="danger"
                            @click="handleScrap( scope.row)">报废</el-button></el-col>
                        <el-col :span="8"><el-button
                            size="mini"
                            type="primary"
                            @click="toDetail( scope.row)">查看详情</el-button></el-col>
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
            tableHeight: window.innerHeight * 0.8 ,
            ststatus: [{label:'全部', value:'0'},{label:'正常', value:'正常'},{label:'报修', value:'报修'},{label:'报废', value:'报废'}],
            dialogVisibleRepair: false,
            dialogVisibleScrap: false,
            search:{
                status:'',
                key:''
            },
            tableData:[],
            idNow:'',
            nameNow:''
        }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      
      add0(m){return m<10?'0'+m:m },
      expirationdateFormatter(row,column){
            var expirationdate = new Date(parseInt(row.expirationdate));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
      buydateFormatter(row,column){
            var expirationdate = new Date(parseInt(row.date));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
      handleRepair(row) {
        this.idNow = row.id;
        this.nameNow = row.name;
        this.dialogVisibleRepair = true;
      },
      handleScrap(row) {
        this.idNow = row.id;
        this.nameNow = row.name;
        this.dialogVisibleScrap = true;
      },
      okRepair(){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('equipment/repair?id='+ _this.idNow+'&responsible='+ '责任人--待处理'+'&name='+_this.nameNow )
                .then(function (response) {
                    alert(response.data);
                    if(response.data=='success'){
                        _this.$message({
                            message: '报修成功',
                            type: 'success'
                            });
                        _this.$router.replace({path: '/repairDev/list'});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
            this.dialogVisibleRepair = false;
      },
      okScrap(){
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('equipment/scrap?id='+ _this.idNow +'&responsible='+ '责任人--待处理'+'&name='+_this.nameNow )
                .then(function (response) {
                    alert(response.data);
                    if(response.data=='success'){
                        _this.$message({
                            message: '提交报废申请成功',
                            type: 'success'
                            });
                        _this.$router.replace({path: '/scrapDev/list'});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("网络连接错误,无法获取服务器数据，请检查后刷新页面");
                });
            this.dialogVisibleScrap = false;
      },
      toDetail(row) {
        this.$router.push({name: 'manageDetail', params:{ val:row }});
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getData(){
            if(!this.search.status){
                var status = '0';
            }else{var status = this.search.status}
            if(!this.search.key){
                var key = '0';
            }else{var key = this.search.key}
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('equipment/find?status='+status+'&info='+key)
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