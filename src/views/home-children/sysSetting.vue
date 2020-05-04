<template>
  <div class="syssetting-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统通知设置</el-breadcrumb-item>
      <el-breadcrumb-item>通知/密保问题</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div class="sys-scroll">
        <h2>滚动栏信息设置:</h2>
        <el-input type="textarea" v-model="notif.scroll" autosize :placeholder="oldNotify.scrollnotify"></el-input>
         <el-button type="warning" round>更新信息</el-button>
      </div>
      <div class="sys-popup">
        <h2>系统弹框设置:</h2>
          <el-input v-model="notif.title" :placeholder="oldNotify.title"></el-input>
          <el-input type="textarea" v-model="notif.textarea" :placeholder="oldNotify.desc" :rows="4"></el-input>
          <el-button type="warning" round>更新弹框</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notif: {
        scroll: "",
        title:'',
        textarea:''
      },
      oldNotify:{
          title: '',
          desc: ''
      }
    };
  },
  methods:{
      async getNotify(){
          let {data:res} = await this.$axios.get(this.$api.getNotify)
          if(res.meta.status == 200){
              this.oldNotify.title = res.res.notify.title
              this.oldNotify.desc = res.res.notify.desc
          }else{
              this.$message.error('获取通知失败!')
          }
      }
  },
  created(){
      this.getNotify()
  }
};
</script>

<style lang="less" scoped>
.syssetting-container {
  padding: 20px;
  text-align: left;
  .el-card {
    margin-top: 12px;
  }
}
.sys-scroll {
  width: 50%;
  .el-button{
      margin-top: 10px;
  }
}
.sys-popup{
    width: 50%;
    .el-input{
        margin-bottom: 8px;
        width: 35%;
    }
    .el-button{
      margin-top: 10px;
  }
}
</style>
