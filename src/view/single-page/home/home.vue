<template>
  <div class="home_box">
    <div class="home_bg">
      <Poptip placement="top" class="point1">
        <p class="point point1"></p>
        <div slot="content">
          <p>{{ homeData.scope2 && homeData.scope2.assembling }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point2">
        <p class="point point2"></p>
        <div class="has_get fadeout">
          <p class="text">+</p>
          <p>0.02kg</p>
        </div>
        <div slot="content">
          <p>{{ homeData.scope2 && homeData.scope2.smt }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point3">
        <p class="point point3"></p>
        <div slot="content">
          <p>{{ homeData.scope1 }}</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point4">
        <p class="point point4"></p>
        <div slot="content">
          <p>{{ homeData.scope2 && homeData.scope2.public }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point5">
        <p class="point point5"></p>
        <div slot="content">
          <p>{{ homeData.scope2 && homeData.scope2.tht }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point6">
        <p class="point point6"></p>
        <div slot="content">
          <p>{{ homeData.scope3 && homeData.scope3[0].pcf }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point7">
        <p class="point point7"></p>
        <div slot="content">
          <p>{{ homeData.scope3 && homeData.scope3[1].pcf }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <Poptip placement="top" class="point8">
        <p class="point point8"></p>
        <div slot="content">
          <p>{{ homeData.scope3 && homeData.scope3[2].pcf }}kg</p>
          <p>CO2e</p>
        </div>
      </Poptip>
      <div class="box_click" @click="showDialog"></div>
      <div class="share_rules" @click="showRules">
        <div class="left"></div>
        <p class="right">PCF共享机制</p>
      </div>
    </div>
    <Modal v-model="show" title="Product Carbon Footprint">
      <div class="content">
        <div class="top">
          <div class="left">
            <p class="title">Product ID</p>
            <p class="number">{{ homeData.product_id }}</p>
            <p class="title">Serial No：{{ homeData.serial }}</p>
          </div>
          <div class="right">
            <p class="img_box"></p>
          </div>
        </div>
        <div class="bottom">
          <p class="first_title">Emission Per Piece</p>
          <p class="acount">
            <span
              >{{
                homeData.scope2 &&
                homeData.scope1 +
                  homeData.scope2.assembling +
                  homeData.scope2.public +
                  homeData.scope2.smt +
                  homeData.scope2.tht +
                  homeData.scope3_total
              }}kg
            </span>
            <span>CO2e</span>
          </p>
          <p class="bottom_acount">
            Emission Scope 1 & 2:
            <span
              >{{
                homeData.scope2 &&
                homeData.scope1 +
                  homeData.scope2.assembling +
                  homeData.scope2.public +
                  homeData.scope2.smt +
                  homeData.scope2.tht
              }}kg</span
            >
            CO2e
          </p>
          <p class="bottom_acount chang_color">
            Emission Scope 3：<span>{{ homeData.scope3_total }}kg</span> CO2e
          </p>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import { ChartPie, ChartBar } from "_c/charts";
import Example from "./example.vue";
import mockData from "../../../../test.js";
import { getHomeData, getDialog } from "@/api/home";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
  },
  data() {
    return {
      show: false,
      homeData: {},
      dialogData: {},
      poptipData: {},
      dataTotal: [],
      count: 0,
    };
  },
  created() {
    this.getlist();
  },
  mounted() {
    // this.homeData = mockData.data[this.count];
    setInterval(() => {
      this.count++;
      // console.log(this.count);
      this.homeData = this.dataTotal[this.count];
      // console.log(this.homeData,"999")
    }, 500 * 3600);
  },
  methods: {
    ...mapMutations(["setProducts"]),
    getlist() {
      console.log(123123, mockData);
      getHomeData().then((res) => {
        console.log(res, "00999");
        if (res.code == 0) {
          this.dataTotal = res.data;
          this.homeData = res.data[this.count];
        } else {
          this.dataTotal = mockData.data;
          this.homeData = mockData.data[this.count];
        }
      });
      var idList = mockData.data.map((item) => {
        var obj = {
          name: item.product_name,
          id: item.product_id,
        };
        return obj;
      });
      console.log(idList, "--==");
      this.setProducts(idList);
    },
    showDialog() {
      this.show = true;
    },
    showRules() {
      console.log(123123);
      this.$router.push("/sharerules");
    },
  },
};
</script>

<style lang="less">
.count-style {
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
        -webkit-animation-fill-mode: forwards;

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
      animation: showhide 3s 0s infinite;
    }
    @-webkit-keyframes showhide {
      0% {
        transparent: 1;
      }
      100% {
        transparent: 0;
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
    .share_rules {
      position: absolute;
      bottom: 20px;
      right: 20px;
      border: 1px solid #25a0a1;
      border-radius: 50px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      z-index: 1000;
      .left {
        width: 30px;
        height: 30px;
        background: url("../../../assets/images/Blockchain.png") center
          no-repeat;
        background-size: cover;
      }
      .right {
        font-size: 14px;
        color: #25a0a1;
        margin-left: 15px;
      }
    }
  }
}
.ivu-modal-wrap {
  .ivu-modal {
    .ivu-modal-content {
      border-radius: 0;
      .ivu-modal-header {
        background: #11435c;
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
              background: #f3f3f3;
              display: flex;
              justify-content: center;
              align-items: center;
              .img_box {
                width: 70px;
                height: 85px;
                background: url("../../../assets/images/image75.png") no-repeat
                  center;
                background-size: cover;
              }
            }
          }
          .bottom {
            padding-top: 20px;
            font-size: 16px;
            color: #000;
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
              top: 7px;
              left: 5px;
              background: #00d3c9;
            }
            .chang_color::before {
              background: #006d80;
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
