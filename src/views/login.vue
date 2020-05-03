<template>
  <div class="login-container">
    <div class="login-box">
        <h3>欢迎来到myqq后台管理系统</h3>
        <div class="form">
            <div class="iptitem">
                <label for="username"><i class="el-icon-user"></i>
                    <input type="text" id="username" v-model="name">
                </label>
            </div>
            <div class="iptitem">
                <label for="password"><i class="el-icon-unlock"></i>
                    <input type="password" id="password" v-model="password">
                </label>
            </div>
            <div class="login-btn"><span @click="loginin">登陆</span></div>
        </div>
    </div>
  </div>
</template>

<script>
import {loginIn} from '@/api/api.js'
export default {
    data(){
        return{
            name:'admin',
            password:'admin'
        }
    },
    methods:{
        async loginin(){
            if(this.name == '' || this.password == ''){
                this.$message.error('用户名或密码不能为空！')
                return 
            }
            let data ={
                name: this.name,
                password: this.password
            }
            let {data:res} = await this.$axios.post(this.$api.login, this.$qs.stringify(data))
            if(res.meta.status == 200){
                let info = {
                    id: res.res._id,
                    avatar: res.res.avatar
                }
                sessionStorage.setItem('btoken', res.token)
                sessionStorage.setItem('info', JSON.stringify(info))
                this.$router.push({name:'home'})
            }else{
                this.$message.error(res.content)
            }
        }
    },
    
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{
      width: 40%;
      height: 40%;
      h3{
          color: #fff;
          font-size: 24px;
          letter-spacing: .1em;
      }
      .form{
          .iptitem{
              display: flex;
              justify-content: center;
              margin-bottom: 12px;
          }
          label{
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              i{
                  font-size: 26px;
                  color: #409EFF;
              }
              input{
              outline: none;
              border: none;
              color: #fff;
              font-weight: bold;
              border-bottom: 2px solid #EA7A95;
              height: 26px;
              margin-left: 30px;
              text-align: center;
              background-color: rgba(113,79,122, .2);
          }
          }
          .login-btn{
              margin-top: 30px;
              span{
                  padding: 8px 24px;
                  border: 2px solid #F0B7A5;
                  border-radius: 20px;
                  color: #F5E7B2;
                  font-weight: 600;
              }
          }
      }
  }
</style>
