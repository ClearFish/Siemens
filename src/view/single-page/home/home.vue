<template>
  <div class="home_box">
    <div class="home_bg">
        <Poptip  placement="top" class="point1" @click="getData('D')">
          <p class="point point1"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
        <Poptip  placement="top" class="point2" @click="getData('B')">
          <p class="point point2"></p>
          <div class="has_get fadeout">
            <p class="text">+</p>
            <p>0.02kg</p>
          </div>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
        <Poptip  placement="top" class="point3" @click="getData('transportation')">
           <p class="point point3"></p>
          <div slot="content">
              <p>269.001kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
         <Poptip  placement="top" class="point4" @click="getData('air')">
           <p class="point point4"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
        <Poptip  placement="top" class="point5" @click="getData('A')">
           <p class="point point5"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
        <Poptip  placement="top" class="point6" @click="getData('A')">
          <p class="point point6"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip>
         <Poptip  placement="top" class="point7" @click="getData('A')">
          <p class="point point7"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip> 
          <Poptip  placement="top" class="point8" @click="getData('A')">
          <p class="point point8"></p>
          <div slot="content">
              <p>{{poptipData.module_count}}kg</p>
              <p>CO2e</p>
          </div>
        </Poptip> 
        <div class="box_click" @click="showDialog"></div>
    </div>
    <Modal
        v-model="show"
        title="Product Carbon Footprint"
        >
        <div class="content">
          <div class="top">
            <div class="left">
              <p class="title">Product ID</p>
              <p class="number">{{dialogData.productId}}</p>
              <p class="title">Serial No：{{dialogData.serial}}</p>
            </div>
            <div class="right">
                <p class="img_box"></p>
            </div>
          </div>
          <div class="bottom">
            <p class="first_title">Emission Per Piece</p>
            <p class="acount">
              <span>{{dialogData && dialogData.scope2 && dialogData.scope2.smt}}kg </span>
              <span>{{dialogData && dialogData.scope2 && dialogData.scope2.tht}}</span>
            </p>
            <p class="bottom_acount" v-for="(item,index) in dialogData.scope3" :key="index">
              {{item.materialName}}：<span>{{item.pcf}}kg</span> CO2e</p>
            <!-- <p class="bottom_acount chang_color">Emission Scope 3：<span>0.2kg</span> CO2e</p> -->
          </div>
        </div>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { getHomeData,getDialog } from '@/api/home'
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
      },
      show:false,
      dialogData:{},
      poptipData:{}
    }
  },
  mounted () {
    //
    getHomeData().then(res=>{
      // console.log(res,"///")
      this.dialogData = res.data;
    })
  },
  methods:{
    showDialog() {
      // getHomeData().then(res=>{
      //   this.dialogData = res.data;
      // })
      this.show = true
    },
    getData(item) {
      // getDialog('2021',item).then(res=>{
      //   this.poptipData = res.data
      // })
    }
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
    background-size: 100% 100%;
      position: relative;
    .safe_width {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
    }
    .point {
      width: 24px;
      height: 29px;
      background: url("../../../assets/images/poin_gr.svg") no-repeat center;
      background-size: contain;
      
      cursor: pointer;
    }
    .point1 {
      position: absolute;
      bottom: 21%;
      left: 44%;
    }
    .point2 {
      position: absolute;
      bottom: 37%;
      left: 31%;
      .has_get {
        position: absolute;
        bottom: 32px;
        left: -8px;
        // opacity: 1;
        -webkit-animation-name: fadeout; /*动画名称*/
        -webkit-animation-duration: 2s; /*动画持续时间*/
        -webkit-animation-iteration-count: 2; /*动画次数*/
        -webkit-animation-delay: 0s;
        -webkit-transition-timing-function: linear;
        -webkit-animation-fill-mode:forwards;
        
@-webkit-keyframes fadeout {
0% {
opacity: 0; /*初始状态 透明度为0*/
bottom: 32px;
}
25% {
  opacity: 0.25;
  bottom: 40px;
}
50% {
opacity: 0.5; /*中间状态 透明度为0*/
bottom: 32px;
}
75% {
  opacity: 0.75;
  bottom: 40px;
}
100% {
opacity: 0; /*结尾状态 透明度为1*/
bottom: 32px;
}
}
        p {
          color: #308508;
          font-size: 12px;
          text-align: center;
          line-height: 16px;
          font-weight: 600;
        }
      }
    }
    .point3 {
      position: absolute;
     bottom: 52%;
      left: 35%;
    }
    .point4 {
      position: absolute;
      bottom: 77%;
      left: 73%;
    }
    .point5 {
      position: absolute;
      bottom: 66%;
      left: 71%;
    }
    .point6 {
      position: absolute;
      bottom: 73%;
      left: 31%;
    }
    .point7 {
      position: absolute;
      bottom: 79%;
      left: 40%;
    }
    .point8 {
      position: absolute;
      bottom: 83%;
      left: 46%;
      animation: showhide 3s 0s infinite;;
    }
    @-webkit-keyframes showhide {
       0%{
         transparent :1
        }
        100%{
          transparent :0
        }
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
    .ivu-poptip {
      margin-top: 1px;
        .ivu-poptip-popper {
          top: -95px !important;
          left: -65px !important;
          .ivu-poptip-content {
            .ivu-poptip-inner {
              .ivu-poptip-body {
                background: #308508;
                .ivu-poptip-body-content {
                  div {
                    p {
                      color: #fff;
                      font-size: 12px;
                    }
                    p:first-child {
                      color: #fff;
                      font-size: 16px;
                      font-weight: 800;
                      margin-bottom: 5px;
                    }
                  }
                }
              }
            }
            .ivu-poptip-arrow::after {
              border-top-color: #308508;
            }
          }
        }
    }
    .box_click {
      width: 126px;
      height: 107px;
      background: transparent;
      position: absolute;
      left: 33%;
      bottom: 5%;
      cursor: pointer;
    }
  }

}
  .ivu-modal-wrap {
    .ivu-modal {
      .ivu-modal-content {
        border-radius: 0;
        .ivu-modal-header {
          background: #11435C;
          .ivu-modal-header-inner {
            font-size: 18px;
            color: #fff;
          }
        }
        .ivu-modal-body {
          .content {
            .top {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #cdcdcd;
              padding-bottom: 20px;
              .left {
                p {
                  font-size: 16px;
                  color: #000;
                  margin-bottom: 10px;
                }
                .number {
                  font-weight: 600;
                }
              }
              .right {
                width: 150px;
                height: 100px;
                background: #F3F3F3;
                display: flex;
                justify-content: center;
                align-items: center;
                .img_box {
                  width: 70px;
                  height: 85px;
                  background: url("../../../assets/images/image75.png") no-repeat center;
                  background-size: cover;
                }
              }
            }
            .bottom {
              padding-top: 20px;
              font-size: 16px;
              color:#000;
              .first_title {
                font-weight: 400;
                margin-bottom: 10px;
              }
              .acount {
                margin-bottom: 10px;
                span:first-child {
                  font-weight: 600;
                }
              }
              .bottom_acount {
                padding-left: 20px;
                position: relative;
              }
              .chang_color {
                margin-top: 10px;
                position: relative;
              }
              .bottom_acount:before {
                content: "";
                width: 8px;
                height: 8px;
                border-radius: 4px;
                display: block;
                position: absolute;
                top:7px;
                left:5px;
                background: #00D3C9;
              }
              .chang_color::before {
                background: #006D80;
              }
            }
          }
        }
        .ivu-modal-footer {
          display: none;
        }
      }
    }
  }
</style>
