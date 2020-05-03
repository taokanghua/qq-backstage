<template>
  <div class="dynamicMa-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>动态管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户动态管理</el-breadcrumb-item>
    </el-breadcrumb>
		<div class="search" style="width:20%;margin-top:10px">
			<el-input
    placeholder="支持 昵称 关键字 搜索"
    suffix-icon="el-icon-search"
		v-model="searchbox"
		@input="search(searchbox)"
    >
  </el-input>
		</div>
    <el-row :gutter="20" type="flex">
      <el-col :span="6" v-for="item in search(searchbox)" :key="item.uniq"
        ><el-card>
          <div class="dynamic-header">
            <div class="dynamic-left">
              <img :src="item.avatar" alt="" />
              <div class="info">
                <h3>{{item.name}}</h3>
                <span style="color:#C0C4CC">{{item.time | timeF}}</span>
              </div>
            </div>
            <div class="control">
              <el-dropdown @command="ordinaryDelete">
                <span class="el-dropdown-link">
                 <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-star-on" :command="item.uniq"
                    >普通删除</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-star-off" :command="item._id"
                    >完全删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <p class="dynamic-content">{{item.content}}</p>
          <!-- 轮播图 -->
          <el-carousel height="200px" :interval="5000" v-if="item.imgs.length > 0">
            <el-carousel-item v-for="item in item.imgs" :key="item+''">
              <img :src="item[0]" alt="图片链接失效" style="width=100%;height:100%;color:red">
            </el-carousel-item>
          </el-carousel>
          <div class="infomation">
            <span class="goods">点赞人数: {{item.goods.length}}</span>
            <span class="comment">评论个数: {{item.comment.length}}</span>
            <span class="look">浏览次数: {{item.looknum}}</span>
          </div>
          <div class="footer">
            <p>用户IP: {{item.ip || '暂无'}} ({{item.local||'暂无'}})</p>
            <span>说说唯一标识: {{item.uniq}}</span>
          </div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>

export default {
	data(){
		return{
			dynamicList:[],
			searchbox:''
		}
	},
	methods:{
		async getDynamicList(){
			let {data:res} = await this.$axios.get(this.$api.getDynamic)
			if(res.meta.status == 200){
				this.dynamicList = res.dynamic
			}else{
				this.$message.error('获取用户动态失败')
			}
		},
		async ordinaryDelete(command){
			if(command.length < 24){
				// 普通删除
				let uniq = {uniq: command}
				let {data:res} = await this.$axios.post(this.$api.ordinaryDelete, this.$qs.stringify(uniq))
				if(res.meta.status == 200){
					this.$message.success('删除成功')
					this.getDynamicList()
				}
			}else{
				console.log('全删除')
			}
		},
		search(keyword){
			return this.dynamicList.filter(item=>{
				if(item.name.includes(keyword)|| item.content.includes(keyword)){
					return true
				}
			})
		}
	},
	created(){
		this.getDynamicList()
	},
	components:{},
	filters:{
		timeF(n) {
			let date = new Date(n); //说说的时间
			let year = date.getFullYear()
			let month = date.getMonth() +1
      let day = date.getDay();
      let h = date
        .getHours()
        .toString()
        .padStart(2, "0")
      let m = date
        .getMinutes()
        .toString()
				.padStart(2, "0")
				return `${year}/${month}/${day} ${h}:${m}`
    }
	}
};
</script>

<style lang="less" scoped>
.dynamicMa-container {
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

.el-row {
	flex-wrap: wrap;
  .el-col {
    .dynamic-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dynamic-left {
        display: flex;
        align-items: center;
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .info {
        margin-left: 12px;
        h3 {
          padding: 0;
          margin: 0;
          font-size: 14px;
        }
        span {
          font-size: 12px;
        }
      }
    }
    .dynamic-content {
      font-size: 13px;
      color: black;
    }
    .el-carousel {
			// background-color: #eee;
			text-align: center;
    }
    .infomation {
      margin: 15px 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .goods {
        color: #67c23a;
      }
      .comment {
        color: #409eff;
      }
      .look {
        color: #e6a23c;
      }
    }
    .footer {
      font-size: 12px;
      p {
        margin: 0;
        color: #f56c6c;
        margin-bottom: 5px;
      }
      span {
        color: #ccc;
      }
    }
  }
}
</style>
