<template>
  <div class="admin-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员账号管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加管理员的dialog -->
    <el-dialog title="提示" :visible.sync="addDialog" width="30%" :data="addForm">
      <el-form ref="form1" label-width="80px" :rules="rules" :model="addForm">
        <el-form-item label="账号:" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-input v-model="addForm.avatar" placeholder="http://taokanghua.cn/sources/avatar/1-28.jpg"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="role">
          <el-select placeholder="请选择用户角色:" v-model="addForm.role">
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('form1')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改信息的dialog -->
    <el-dialog
      title="提示"
      :visible.sync="editDialog"
      width="30%"
      :data="editForm"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="账号:">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机:">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-input disabled v-model="editForm.role"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-card>
      <el-button type="success" @click="addAdmin">添加管理员</el-button>
      <el-table :data="adminlist" style="width: 100%" border stripe v-loading="$store.state.isLoading">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="name" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template v-slot="scope">
            <el-switch
              v-model="adminlist[scope.$index].enable"
              @change="changeStatus(scope.$index)"
              active-text="启用"
              inactive-text="禁用"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button type="warning" round @click="changeinfo(scope.$index)"
              >修改用户信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminlist: [],
      editDialog: false,
      editForm: {},
      addDialog: false,
      addForm: {
        name:'',
        email:'',
        phone:'',
        password:'',
        avatar:'',
        role:''
      },
      rules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
          ],
        password:[
          {required:true, message:'请输入密码', trigger:'blur'},
          {min:5, max:16, message:'长度在5-16个字符', trigger:'blur'}
        ],
        phone:[
          {required:true, message:'请输入号码', trigger:'blur'},
          {min:11, max:11, message:'长度在11个字符', trigger:'blur'}
        ],
        role:[
          {required:true, message:'请选择角色', trigger:'blur'}
        ]
      }
    };
  },
  methods: {
    async getAdminList() { //获取管理员列表
      let { data: res } = await this.$axios.get(this.$api.adminlist);
      if (res.meta.status == 200) {
        this.adminlist = res.list;
      } else {
        this.$message.error("获取管理员列表失败了");
      }
    },
    async changeStatus(index) {
      // console.log(index, this.adminlist[index].enable);
      let data = {
        name: this.adminlist[index].name,
        status: this.adminlist[index].enable,
      };
      let { data: res } = await this.$axios.post(
        this.$api.changestatus,
        this.$qs.stringify(data)
      );
      if (res.meta.status == 200) {
        this.$message.success(res.content);
      } else {
        this.$message.error(res.content);
      }
      this.getAdminList();
    },
    async changeinfo(index) {
      let name = this.adminlist[index].name;
      this.editDialog = !this.editDialog;
      let { data: res } = await this.$axios.get(this.$api.admininfo + name);
      if (res.meta.status == 200) {
        this.editForm = res.info;
      } else {
        this.$message.error("获取用户信息失败");
      }
    },
    async confirmEdit() {
      this.editDialog = false;
      let { data: res } = await this.$axios.post(
        this.$api.editadmin,
        this.$qs.stringify(this.editForm)
      );
      if (res.meta.status == 200) {
        this.$message.success(res.content);
        this.getAdminList();
      } else {
        this.$message.error(res.content);
      }
    },
    addAdmin(){
      this.addDialog = true
    },
    confirmAdd(formRef){
      this.$refs[formRef].validate(async valid => {
        if(valid){
          let {data:res} = await this.$axios.post(this.$api.addadmin, this.$qs.stringify(this.addForm))
          if(res.meta.status == 200){
            this.$message.success(res.content)
          }else{
            this.$message.error(res.content)
          }
          this.addDialog = false
          this.$refs[formRef].resetFields();
        }else{
          this.$message.error('请按要求填写表格...')
        }
      })
    }
  },
  components: {},
  created() {
    this.getAdminList();
  },
};
</script>

<style lang="less" scoped>
.admin-container {
  padding: 20px;
  text-align: left;
  .el-card {
    margin-top: 15px;
    .el-table {
      margin-top: 10px;
    }
  }
}
</style>
