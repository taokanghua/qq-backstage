<template>
  <div class="home-container">
    <div class="header">
      <h2>MYQQ后台管理系统</h2>
      <div class="info">
        <el-input placeholder="请输入想搜索的内容" suffix-icon="el-icon-search">
        </el-input>
        <el-badge :value="12" class="item" type="primary">
          <el-button type="info" icon="el-icon-message" circle></el-button>
        </el-badge>
        <el-badge :value="12" class="item">
          <el-button type="info" icon="el-icon-bell" circle></el-button>
        </el-badge>
        <img :src="avatar" alt="" />
      </div>
    </div>
    <div class="home-content">
      <div class="home-nav">
        <el-menu
          :default-active="activeMenu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          @select="changeMenu"
          unique-opened
        >
          <!-- 折叠菜单功能 有点bug 暂时取消 -->
          <!-- <div class="collapse" @click="isCollapse = !isCollapse">
            <span></span><span></span><span></span>
          </div> -->
          <el-menu-item index="/home/overview">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/accountManager">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/home/accountManager">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户账号管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/home/adminAccountManager">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>管理员账号管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/sysnotif">
            <template slot="title">
              <i class="el-icon-chat-line-round"></i>
              <span>系统通知设置</span>
            </template>
            <el-menu-item index="/home/sysSetting">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>通知/密保问题</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="dynamicManager">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>动态管理</span>
            </template>
            <el-menu-item index="/home/dynamicManager">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户动态管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/mapChart">
            <i class="el-icon-s-data"></i>
            <span slot="title">用户地图分布</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="home-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeMenu: "/home/overview",
      avatar: "",
      userid: "",
    };
  },
  methods: {
    changeMenu() {
      this.activeMenu = this.$route.path;
    },
  },
  // created(){
  // 	this.changeMenu()
  // },
  watch: {
    "$route.path"(n) {
      this.changeMenu();
    },
  },
  created() {
    // 获取用户信息
    let info = JSON.parse(sessionStorage.getItem("info"));
    this.avatar = info.avatar;
    this.userid = info.id;
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  h2 {
    padding: 0;
    margin: 0;
  }
  .info {
    display: flex;
    .el-input {
      margin-right: 30px;
    }
    .el-badge {
      margin-right: 20px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.home-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  .home-nav {
    .el-menu {
      width: 200px;
      max-width: 200px;
      height: 100%;
      text-align: left;
      .collapse {
        width: 100%;
        height: 20px;
        background-color: #0e0c28;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          display: block;
          width: 2px;
          height: 80%;
          background-color: #fff;
          margin-right: 2px;
        }
      }
    }
  }
  .home-right {
    flex: 1;
    background-color: #eeeeee;
    height: 93.6vh;
    overflow: auto;
  }
}
</style>
