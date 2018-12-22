<template>

<div class="order">
    <!-- 显示当前页面路径 开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统权限</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 显示当前页面路径 结束 -->  
  <el-row :gutter="0" style="padding:10px">
    <el-col :span="10">
        <div>
            <!--下拉列表框 开始-->
            <el-select style="width:120px" v-model="value1" clearable placeholder="请选择">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input
            style="width:120px"
            placeholder="请输入内容"
            v-model="input1"
            clearable>
            </el-input>
            <!--下拉列表框 结束-->
            <el-button type="primary" plain>查询</el-button>
        </div>
    </el-col>
    <el-col :span="7">
        <div>
            权限：<el-input style="width:100px" v-model="input2"></el-input>
            <!--下拉列表框 开始-->
            <el-select style="width:110px" v-model="value2" clearable placeholder="请选择">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
    <!--下拉列表框 结束-->
        </div>
    </el-col>
    <el-col :span="7">
        <div>
            <el-row>
            <el-button type="primary" plain>修改</el-button>
            <el-button type="primary" plain>删除</el-button>
            <el-button type="primary" plain>更新</el-button>
            </el-row>
        </div>
    </el-col>
  </el-row>  


    <div id="qxgl">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          class="t1"
          height="500" 
          style="width: 100%"
          :default-sort = "{prop: 'time', order: 'descending'}" >
          <el-table-column
            prop="num"
            header-align="center"
            label="序号"
            height="50"
            width="100"
             sortable>
          </el-table-column>
          <el-table-column
            prop="permission"
            header-align="center"
            label="权限"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="sex"
            header-align="center"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="job"
            header-align="center"
            label="职务">
          </el-table-column>
          <el-table-column
            prop="jobTitle"
            header-align="center"
            label="职称">
          </el-table-column>
          <el-table-column
            prop="phone"
            header-align="center"
            label="联系方式">
          </el-table-column>
        </el-table>
    </div>




</div>
</template>

<script>
    export default {
        data() {
            return{
                options1: [{
                    value: '选项1',
                    label: '教师姓名'
                    }, {
                    value: '选项2',
                    label: '教务用户'
                }],
                value1: '',

                 options2: [{
                    value: '选项1',
                    label: '教师'
                    }, {
                    value: '选项2',
                    label: '学生'
                }],
                value2: '',
                input1: '',

            }
        },
        methods(){

        }
    }
</script>
<style>
.el-row {
    margin-bottom: 10px;
    margin-left: 0px;
  }
</style>