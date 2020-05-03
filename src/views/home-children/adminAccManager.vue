<template>
  <div class="admin-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-card>
      <el-table :data="selectbox" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="id" label="账号" width="180"> </el-table-column>
        <el-table-column prop="id" label="密码" width="180"> </el-table-column>
        <el-table-column prop="id" label="电话" width="180"> </el-table-column>
        <el-table-column prop="id" label="邮箱" > </el-table-column>
        <el-table-column prop="id" label="角色" width="180"> </el-table-column>
        <el-table-column label="状态" width="180"> </el-table-column>
        <el-table-column label="操作" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  data(){
    return{}
  },
  methods:{},
  components:{
    
  }
};
</script>

<style lang="less" scoped>
.admin-container{
  padding: 20px;
  text-align: left;
  .el-card{
    margin-top: 15px;
  }
}
</style>