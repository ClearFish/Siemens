<template>
  <div class="home_box">
    <!-- <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
    <div class="home_bg">
      <!-- <div class="safe_width"> -->
          <p class="point point1"></p>
          <p class="point point2"></p>
          <p class="point point3"></p>
          <p class="point point4"></p>
          <p class="point point5"></p>
          <p class="point point6"></p>
          <p class="point point7"></p>
          <p class="point point8"></p>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
    // getHomeData().then(res=>{
    //   console.log(res,"///")
    // })
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
.home_box {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  // img {
  //   width: 100%;
  //   position: relative;
  //   height: 100%
  // }
  .home_bg {
    // margin: 0 auto;
    width: 100%;
    height: 100%;
    background: url("../../../assets/images/home_bg.gif") center no-repeat;
    background-size: cover;
    .safe_width {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
    }
    .point {
      width: 24px;
      height: 29px;
      background: url("../../../assets/images/poin_gr.svg") no-repeat center;
      background-size: cover;
      position: absolute;
      cursor: pointer;
    }
    .point1 {
      bottom: 20%;
      left: 44%;
    }
    .point2 {
      bottom: 37%;
      left: 31%;
    }
    .point3 {
     bottom: 52%;
      left: 35%;
    }
    .point4 {
      bottom: 79%;
      left: 73%;
    }
    .point5 {
      bottom: 66%;
      left: 71%;
    }
    .point6 {
      bottom: 75%;
      left: 31%;
    }
    .point7 {
      bottom: 82%;
      left: 40%;
    }
    .point8 {
      bottom: 86%;
      left: 46%;
    }
    .text_box {
      position: absolute;
      bottom: 340px;
      left: 470px;
      p {
        color: #308508;
        font-size: 12px;
        text-align: center;
        line-height: 16px;
        font-weight: 600;
      }
      .text {
        margin-bottom: -8px;
      }
    }
  }
}
</style>
