<template>
    <el-container>
      <el-header class="header-path" style="height:40px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>修理设备列表</el-breadcrumb-item>
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

        <el-date-picker
            v-model="search.data"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2">
        </el-date-picker>
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
        height="350px"
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'xqdm', order: 'descending'}">
        <el-table-column
            :formatter="dateFormatter"
            prop="date"
            label="修理日期"
            sortable>
        </el-table-column>
        <el-table-column
            prop="name"
            label="设备名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="equid"
            label="编号"
            sortable
            >
        </el-table-column>
        <el-table-column
            prop="repairfactory"
            label="修理厂家"
            sortable>
        </el-table-column>
        <el-table-column
            prop="cost"
            label="修理费用"
            sortable>
        </el-table-column>
        <el-table-column
            prop="responsible"
            label="责任人"
            sortable>
        </el-table-column>
        <el-table-column
            prop="status"
            label="修理状态"
            sortable>
        </el-table-column>
       
        <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleRepair(scope.row)">处理修理
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    </el-container>
</template>

<script>
export default {
    mounted(){
        this.getData(); //获取数据前先取数据
    },
    data() {
        return {
            ststatus: [{label:'全部', value:'0'},{label:'没修好', value:'没修好'},{label:'已修好', value:'已修好'},{label:'待修理', value:'待修理'}],

            search:{
                data:'',
                status:'',
                key:'',
                timeStart:'',
                timeEnd:''
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
        }

        }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
            
      add0(m){return m<10?'0'+m:m },
      dateFormatter(row,column){
            var expirationdate = new Date(parseInt(row.date));
            var year=expirationdate.getFullYear();
            var month=expirationdate.getMonth()+1;
            var day=expirationdate.getDate();
            return year+"-"+this.add0(month)+"-"+this.add0(day);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleRepair(row) {
        this.$router.replace({name: 'isRepair', params:{ val:row }});
      },

      getData(){

            if(!this.search.status){
                var status = '0';
            }else{var status = this.search.status;}
            if(!this.search.key){
                var key = '0';
            }else{var key = this.search.key;}
            if(!this.search.data){
                var timeStart = '0';
                var timeEnd = '0';
            }else{
                var timeStart = this.search.data.toString().split(',')[0];
                var timeEnd = this.search.data.toString().split(',')[1];
            }
            var _this=this;
            //需要处理异步请求的问题
            this.axios.get('repair/find?status='+status+'&info='+key+'&timeStart='+timeStart+'&timeEnd='+timeEnd)
                .then(function (response) {
                    //将response获得的数据进行处理
                    //将获取到的数据以数组形式传递出去
                    var dataList=response.data;
                    _this.tableData=dataList;
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