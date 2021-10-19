<template>
  <div class="big_box">
    <div class="top">
      <p class="title" @click="goBack(-2)">Factory Emission</p>
      <p class="title add_margin">/</p>
      <p class="title add_margin" @click="goBack(-1)">Emission History</p>
      <p class="change_color">/</p>
      <p class="change_color">More Details</p>
    </div>
    <div class="content_box">
      <div class="top_title">
        <p class="title">Emission History</p>
      </div>
      <div class="top_content">
        <div class="left_content">
          <div class="serial_num">
            <p>Serial No：{{ detailData.serial }}</p>
          </div>
          <p class="name">{{ detailData.product_name }}</p>
          <p class="acount">
            <span class="icon_box"></span>
            <span class="value_box"
              >Total PCF value：{{
                detailData.pcf_total && detailData.pcf_total.toFixed(3)
              }}kg CO2e</span
            >
          </p>
          <ul class="bottom_list">
            <li>
              <p>
                <span class="icon_box icon1"></span>
                <span>Date:{{ timestampToTime(detailData.date) }}</span>
              </p>
            </li>
            <li>
              <p>
                <span class="icon_box icon2"></span>
                <span>Product ID:{{ detailData.product_id }}</span>
              </p>
            </li>
            <li>
              <p>
                <span class="icon_box icon3"></span>
                <span
                  >Weight:{{
                    detailData.product_id == "6ES75111CK010AB0" ? 1.229 : 1.551
                  }}kg</span
                >
              </p>
            </li>
            <li>
              <p>
                <span class="icon_box icon4"></span>
                <span>Cost Per Piece:{{ detailData.cost }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="right_content">
          <img
            :src="
              require(`../../../assets/images/${detailData.product_id}.jpg`)
            "
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="top_title">
        <p class="title">Specific PCS Value</p>
      </div>
      <div class="center_cont">
        <div class="cont_title">
          <p class="icon_img"></p>
          <p class="icon_right">
            <span>Scope 1&2：</span>
            <span class="add_weight"
              >{{
                Number(
                  detailData.pcf_scope12.public +
                    detailData.pcf_scope12.smt +
                    detailData.pcf_scope12.tht +
                    detailData.pcf_scope12.assembling
                ).toFixed(3)
              }}kg</span
            >
            <span> CO2e</span>
          </p>
        </div>
        <ul class="ul_list">
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="'list_li list_li' + index"
          >
            <p>{{ item.name }}：</p>
            <p>
              <span class="num">{{ Number(item.num).toFixed(3) }}kg</span> CO2e
            </p>
          </li>
        </ul>
      </div>
      <div class="center_cont bottom_cont">
        <div class="top_con">
          <div class="cont_title">
            <p class="icon_img"></p>
            <p class="icon_right">
              <span>Scope 3：</span>
              <span class="add_weight">{{ scope3Total }}kg</span>
              <span>CO2e</span>
            </p>
          </div>
          <Button type="text" size="small" @click="gotoValus">Load More</Button>
        </div>
        <div class="ul_list2">
          <ul>
            <li v-for="(item, index) in detailData.pcf_scope3" :key="index">
              <div class="left">
                <img src="../../../assets/images/more _details.png" alt="" />
              </div>
              <div class="right">
                <p class="name">{{ item.material_name }}</p>
                <p class="number">{{ item.pcf && item.pcf.toFixed(3) }}kg</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetails } from "@/api/home";
export default {
  data() {
    return {
      list: [
        { name: "SMT", num: "" },
        { name: "THT", num: "" },
        { name: "Assembling", num: "" },
        { name: "Public utilities", num: "" },
      ],
      list2: [
        { name: "SMT", num: "0.1kg" },
        { name: "SMT", num: "0.1kg" },
        { name: "SMT", num: "0.1kg" },
        { name: "SMT", num: "0.1kg" },
        { name: "SMT", num: "0.1kg" },
        { name: "SMT", num: "0.1kg" },
      ],
      detailData: {
        product_id: "6ES75111CK010AB0",
        product_name: "123123aqaaa",
        serial: "123132",
        image_url: "null",
        location: "asd",
        weight: 0,
        cost: 0,
        pcf_total: 0,
        pcf_scope12: {
          public: 0,
          smt: 0,
          tht: 0,
          assembling: 0,
        },
        date: 1634225785,
        pcf_scope3: [
          {
            material_id: "asdasd",
            material_name:
              "Assembling Assembling Assembling Assembling Assembling Assembling",
            pcf: 0,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 2,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 4,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 6,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 4,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 6,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 6,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 4,
            image_url: "null",
          },
          {
            material_id: "asdasd",
            material_name: "asdasd",
            pcf: 6,
            image_url: "null",
          },
        ],
      },
      scope3Total: null,
    };
  },
  created() {
    console.log(this.$route, "//");
    // var sum = 0
    // this.detailData.pcf_scope3.forEach(e=>{

    //     sum+= e.pcf
    // })
    // this.scope3Total = sum
    var obj = {
      product_id: this.$route.query.id,
      serial: this.$route.query.serial,
    };

    /**
         *   "data": {
                "product_id": "string",
                "product_name": "string",
                "serial": "string",
                "image_url": "string",
                "location": "string",
                "weight": 0,
                "cost": 0,
                "pcf_total": 0,
                "pcf_scope12": {
                "public": 0,
                "smt": 0,
                "tht": 0,
                "assembling": 0
                },
                "pcf_scope3": [
                {
                    "material_id": "string",
                    "material_name": "string",
                    "pcf": 0,
                    "image_url": "string"
                }
                ]
            }
         * 
         * 
         */
    getDetails({ ...obj }).then((res) => {
      if (res.data.code == 200) {
        this.detailData = res.data.data;
        this.list[0].num = res.data.data.pcf_scope12.smt;
        this.list[1].num = res.data.data.pcf_scope12.tht;
        this.list[2].num = res.data.data.pcf_scope12.assembling;
        this.list[3].num = res.data.data.pcf_scope12.public;
        var sum = 0;
        res.data.data.pcf_scope3.forEach((e) => {
          sum += e.pcf;
        });
        this.scope3Total = Number(sum).toFixed(3);
      }
    });
  },
  methods: {
    gotoValus() {
      this.$router.push("/emission/history/pcfvalue/" + this.$route.query.id);
    },
    goBack(steps) {
      this.$router.go(steps);
    },
    timestampToTime(timestamp) {
      console.log(timestamp, this.detailData, "[]===");
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      console.log(date, "[][]");
      var Y = date.getFullYear() + "-";
      console.log(Y, "===");
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>
<style lang="less" scoped>
.big_box {
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 14px;
      color: #00183c;
      position: relative;
    }
    .add_margin {
      margin-left: 15px;
    }
    .change_color {
      color: #999999;
      margin-left: 15px;
      font-size: 14px;
    }
    p {
      cursor: pointer;
    }
  }
  .content_box {
    padding: 20px;
    background: #fff;
    margin-top: 20px;
    .top_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        color: #11435c;
        position: relative;
      }
      .title::after {
        content: "";
        display: block;
        width: 30px;
        height: 2px;
        position: absolute;
        bottom: -5px;
        left: 0;
        background: #11435c;
        opacity: 0.12;
      }
    }
    .top_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .left_content {
        .name {
          color: #11435c;
          font-size: 36px;
        }
        .serial_num {
          display: block;
          height: 26px;
          p {
            float: left;
            background: #11435c;
            padding: 5px 10px;
            border-radius: 40px;
            color: #fff;
          }
          margin-bottom: 20px;
        }
        .acount {
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          display: flex;
          align-items: center;
          span {
            display: block;
          }
          .icon_box {
            width: 24px;
            height: 24px;
            background: url("../../../assets/images/pcf_total.png") no-repeat
              center;
            background-size: cover;
            margin-right: 5px;
          }
        }
        .bottom_list {
          margin-top: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          li {
            margin-right: 15px;
            p {
              font-size: 14px;
              color: #000;
              display: flex;
              align-items: center;
              span {
                display: block;
              }
              .icon_box {
                width: 24px;
                height: 24px;
                margin-right: 5px;
              }
              .icon1 {
                background: url("../../../assets/images/date.png") no-repeat
                  center;
                background-size: cover;
              }
              .icon2 {
                background: url("../../../assets/images/pcf_id.png") no-repeat
                  center;
                background-size: cover;
              }
              .icon3 {
                background: url("../../../assets/images/pcf_weight.png")
                  no-repeat center;
                background-size: cover;
              }
              .icon4 {
                background: url("../../../assets/images/pcf_piece.png")
                  no-repeat center;
                background-size: cover;
              }
            }
          }
        }
      }
      .right_content {
        width: 306px;
        height: 204px;
        background: #eef1f6;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 139px;
          height: 177px;
        }
      }
    }
    .center_cont {
      margin-top: 30px;
      border-bottom: 1px solid #cdcdcd;
      padding-bottom: 20px;
      .cont_title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon_img {
          width: 20px;
          height: 18px;
          background: url("../../../assets/images/detail_icon.png") no-repeat
            center;
          background-size: cover;
        }
        .icon_right {
          margin-left: 10px;
          font-size: 16px;
          color: #11435c;
          .add_weight {
            font-weight: 600;
          }
        }
      }
      .ul_list {
        display: flex;
        padding-left: 20px;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        li {
          display: flex;
          margin-right: 35px;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          p {
            font-size: 14px;
            color: #000;
            .num {
              font-weight: 600;
            }
          }
        }
        .list_li::before {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          position: absolute;
          left: -15px;
          top: 5px;
          background: #006d80;
        }
        .list_li1::before {
          background: #00d3c9;
        }
        .list_li2::before {
          background: #a4dc94;
        }
        .list_li3::before {
          background: #ffe898;
        }
      }
    }
    .bottom_cont {
      border-bottom: none;
      .top_con {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ivu-btn-text {
          color: #006d80;
        }
        .ivu-btn {
          outline: none;
          border: none !important;
        }
        .ivu-btn:hover {
          background: none;
          border: none;
          box-shadow: none;
        }
        .ivu-btn:focus {
          background: none;
          border: none;
          box-shadow: none;
        }
        .ivu-btn:active {
          background: none;
          border: none;
          box-shadow: none;
        }
      }
      .ul_list2 {
        margin-top: 20px;
        width: 100%;
        ul {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          flex-wrap: wrap;
          li {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px;
            border: 1px solid #cdcdcd;
            width: 207px;
            margin-right: 15px;
            margin-bottom: 15px;
            overflow: hidden;
            .left {
              width: 78px;
              height: 52px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #f3f3f3;
              margin-right: 10px;
              img {
                width: 37px;
                height: 47px;
              }
            }
            .right {
              margin-left: 10px;
              width: 89px;
              .name {
                width: 100%;
                font-size: 14px;
                color: #000;
                opacity: 0.6;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .number {
                font-size: 14px;
                color: #000;
                font-weight: 800;
              }
            }
          }
        }
      }
    }
  }
}
</style>