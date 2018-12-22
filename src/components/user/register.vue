<template>

<!-- 显示当前页面路径 开始 -->
<div >
    <div class="order">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程简介管理</el-breadcrumb-item>
        <el-breadcrumb-item>专业课程</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
<!-- 显示当前页面路径 结束 -->
<!--菜单栏-->
<el-tabs type="border-card">
    <el-tab-pane label="基本信息查询">
        <el-row :gutter="20" class="cxtj"> 

            <el-col :span="7" >
                <el-row>
                    <el-col :span="11">学院</el-col>
                    <el-col :span="13"> 
                        <el-select v-model="xq" size="small">
                            <el-option v-for="xqItem in xqList"
                                :key="xqItem.value"
                                :label="xqItem.label"
                                :value="xqItem.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="7">
                <el-row>
                    <el-col :span="11">专业</el-col>
                    <el-col :span="13"> 
                        <el-select v-model="xy" size="small">
                            <el-option v-for="xyItem in xyList"
                                :key="xyItem.value"
                                :label="xyItem.label"
                                :value="xyItem.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="7">
                <el-row>
                    <el-col :span="11">年级</el-col>
                    <el-col :span="13"> 
                        <el-select v-model="nj" size="small">
                            <el-option v-for="njItem in njList"
                                :key="njItem.value"
                                :label="njItem.label"
                                :value="njItem.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="3"><el-button size="small" type="primary" plain>查询</el-button></el-col>
        </el-row>
    </el-tab-pane>
</el-tabs>


</div>
    
</template>
<script>
   export default {
       data:{

       },
       methods:{

       }
   }

</script>
<style>
.order{
    margin: 20px
}
</style>
