<template>
  <div class="welcome-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Index</el-breadcrumb-item>
    </el-breadcrumb>
    <p class="wel">Hi！<span>kanghuat</span> 欢迎回来!</p>

    <div class="wel-show">
      <el-card
        :class="['box-card', item.cclass]"
        v-for="item in cardlist"
        :key="item.cclass"
      >
        <div class="show-box">
          <i :class="item.icon"></i>
          <div class="show-num">
            <h3>{{ item.number }} 人</h3>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </el-card>
    </div>
    <!-- echarts 展示盒子 -->
    <div class="chart-box">
      <div ref="lineBox"></div>
      <div ref="pie"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardlist: [
        {
          icon: "el-icon-user",
          number: 10,
          cclass: "online-now",
          title: "当前在线人数",
        },
        {
          icon: "el-icon-user",
          number: 10,
          cclass: "online-today",
          title: "今日上线人数",
        },
        {
          icon: "el-icon-user",
          number: 10,
          cclass: "reg-today",
          title: "今日新增注册",
        },
        {
          icon: "el-icon-user",
          number: 10,
          cclass: "reg-total",
          title: "总注册人数",
        },
      ],
    };
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(this.$refs.lineBox);
      myChart.setOption({
        title: { text: "每日登陆人数" },
        tooltip: { trigger: "axis" },
        legend: {},
        grid: {
          left: "3%",
          rigth: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1号", "2号", "3号", "4号", "5号"],
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "1号登陆人数",
            type: "line",
            data: [5, 2, 8, 12, 0, 11, 17],
          },
          {
            name: "2号登陆人数",
            type: "line",
            data: [5, 10, 8, 21, 22, 8, 33],
          },
          {
            name: "3号登陆人数",
            type: "line",
            data: [5, 4, 8, 12, 36, 42, 18],
          },
          {
            name: "4号登陆人数",
            type: "line",
            data: [5, 14, 30, 23, 27, 31, 42],
          },
          {
            name: "5号登陆人数",
            type: "line",
            data: [5, 24, 21, 4, 22, 14, 49],
          },
        ],
      });
    },
    drawPie() {
      let myChart = this.$echarts.init(this.$refs.pie);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
        },
        series: [
          {
            name: "用户性别",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            color:['#409EFF', 'pink'],

            label: {
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "男", selected: true},
              { value: 679, name: "女"},
            ],
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },

                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              { value: 335, name: "黄冈" },
              { value: 310, name: "广州" },
              { value: 234, name: "上海" },
              { value: 135, name: "深圳" },
              { value: 1048, name: "湖北" },
              { value: 251, name: "重庆" },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
};
</script>
<style lang="less" scoped>
.welcome-container {
  padding: 20px;
  text-align: left;
}
.wel {
  font-size: 20px;
  font-weight: bold;
  span {
    color: #409eff;
  }
}
.wel-show {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 24%;
    .show-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 48px;
      }
      .show-num {
        h3 {
          font-size: 28px;
          padding: 0;
          margin: 0;
        }
        p {
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
}
.chart-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  div {
    width: 49%;
    height: 50vh;
    background-color: #fff;
    box-shadow: 1px 1px 8px 6px #dcdfe6;
    border-radius: 4px;
    padding: 8px 0;
  }
}

.online-now {
  i,
  h3 {
    color: #409eff;
  }
}
.online-today {
  i,
  h3 {
    color: #b162ac;
  }
}
.reg-total {
  i,
  h3 {
    color: #03c895;
  }
}
.reg-today {
  i,
  h3 {
    color: #ff4f81;
  }
}
</style>
