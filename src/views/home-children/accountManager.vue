<template>
  <div class="ordinaryAcc-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户账号管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="32%"
    >
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户id:">
    <el-input v-model="form.id" disabled></el-input>
  </el-form-item>
  <el-form-item label="用户昵称:">
    <el-input v-model="form.nickname"></el-input>
  </el-form-item>
  <el-form-item label="用户性别:">
    <el-input v-model="form.gender"></el-input>
  </el-form-item>
  <el-form-item label="个性说明:">
    <el-input v-model="form.selfdesc"></el-input>
  </el-form-item>
  <el-form-item label="出生日期:">
      <el-input v-model="form.borndate"></el-input>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateuserinfo">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-card>
      <div class="search-container">
        <div class="search-ipt">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="searchbox" @input="search(searchbox)">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <el-button type="primary" class="add-user">添加用户</el-button>
      </div>
      <el-table :data="selectbox" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="id" label="账号" width="180"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="180">
        </el-table-column>
        <el-table-column prop="borndate" label="出生日期" width="240">
        </el-table-column>
        <el-table-column prop="selfdesc" label="个性说明"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click.native.prevent="edit(scope.$index)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteuser(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.display"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchbox:'', //搜索框的内容
      selectbox:[], //筛选过后的数据
      userlist:[], //用户列表渲染列表
      tableData: {}, //后台分页信息 包括 列表
      dialogVisible:false, 
      form:{},
      pagination:{
        page:1,
        size: 10 , //当前每页显示多少条数据      
        display: [2,5,10]
      }
    };
  },
  methods: {
    async getusers() { // 获取用户列表
      let {data:res} = await this.$axios.post(this.$api.getpagination, this.$qs.stringify(this.pagination));
      this.tableData = res
      this.userlist = res.records
      this.search('') //数据加载出来就调用search方法
      // console.log('我被调用了')
    },
    async edit(s) { //编辑用户信息
      
      // console.log(this.tableData.records[s].id)
      let {data:res} = await this.$axios.get(this.$api.findById + this.tableData.records[s].id)
      if(res.meta.status == 200){
        this.form = res.res
        this.dialogVisible = true
      }else{
        this.$message.error('拉取用户信息失败!')
      }
      
    },
    async updateuserinfo(){
      this.dialogVisible = false
      let data = {
        account: this.form.id,
        nickname: this.form.nickname,
        gender: this.form.gender,
        borndate: this.form.borndate,
        setmyself: this.form.selfdesc,
        img: this.form.img
      }
      let {data:res} = await this.$axios.post(this.$api.updateuserinfo, this.$qs.stringify(data))
      if(res.meta.status ==200){
        this.getusers()
        this.$message.success('更新用户信息成功！')
        
      }else{
        this.$message.error('更新用户信息失败！')
      }
    },
    deleteuser(s){ //删除用户
      let id = this.tableData.records[s].id
      this.$confirm('确认删除该用户, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(async()=>{
          let {data:res} = await this.$axios.get(this.$api.deleteuser+id)
          if(res.meta.status == 200){
            this.$message.success('删除用户成功！')
          }else if(res.meta.status == 201){
            this.$message.warning('删了一部分')
          }else{
            this.$message.error('删除失败')
          }
          this.getusers()
        }).catch((e)=>{console.log(e)})
    },
    handleSizeChange(val){ // 每页条数变化会触发
      this.pagination.size  = val
      this.getusers()
    },
    handleCurrentChange(val){
      this.pagination.page = val
      this.getusers()
    },
    search(keyword){ //筛选
      // console.log(this.userlist)
      // console.log('我执行了')
      this.selectbox =  this.userlist.filter(item=>{
        if(item.id.includes(keyword)|| item.nickname.includes(keyword)){
          return true
        }
      })
    }
  },
  components: {},
  created() {
    this.getusers();
  }
};
</script>

<style lang="less" scoped>
.ordinaryAcc-container {
  padding: 20px;
  text-align: left;
  .el-card {
    margin-top: 15px;
    .el-table {
      font-size: 13px;
      margin-bottom: 15px;
    }
  }
}
.search-container {
  display: flex;
  margin-bottom: 15px;
  .search-ipt {
    width: 20%;
    margin-right: 40px;
  }
}
</style>
