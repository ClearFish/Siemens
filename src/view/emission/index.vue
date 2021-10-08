<template>
    <div class="big_box">
        <div class="top">
            <p>Factory Emission</p>
           <DatePicker type="year" 
                       placeholder="Select year" 
                       style="width: 200px"
                       v-model="querForm.year"
                       format="yyyy"
                       @on-change="queryData"
            ></DatePicker>
            <Select v-model="querForm.factory" style="width:200px" @on-change="queryData">
                <Option v-for="(item,index) in productList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
        </div>
        <div class="content_box">
            <div class="left">
                <div class="top">
                    <p class="title">Factory Statistics</p>
                    <div class="list">
                        <ul>
                            <li v-for="(item,index) in topList" :key="index">
                                <div class="icon_box">
                                    <p :class="'icon icon'+index"></p>
                                </div>
                                <div class="list_right">
                                    <p class="number">{{item.count}}</p>
                                    <p class="number_bottom">{{item.title}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_top">
                        <div class="left">
                            <p class="title">Emission History</p>
                            <p class="sup_title">Based on the average product volume</p>
                        </div>
                        <Button type="text" @click="gotoHitory">Load More</Button>
                    </div>
                    <div class="bottom_content">
                        <div class="canvas_box">
                            <div class="top_canvas">
                                <div class="left_canvas">
                                    <p class="name">Emission</p>
                                    <div class="types">
                                        <p>Quarter</p>
                                        <p>Month</p>
                                        <p class="active">Day</p>
                                    </div>
                                </div>
                                <div class="right_canvas">
                                    <p class="first_p">Emission Scope 1&2</p>
                                    <p>Emission Scope 3</p>
                                </div>
                            </div>
                            <div>
                                <Card shadow>
                                    <example style="height: 310px;"/>
                                </Card>
                            </div>
                        </div>
                        <div class="canvas_box">
                            <div class="top_canvas">
                                <div class="left_canvas">
                                    <p class="name">Emission</p>
                                    <div class="types">
                                        <p>Quarter</p>
                                        <p>Month</p>
                                        <p class="active">Day</p>
                                    </div>
                                </div>
                                <div class="right_canvas">
                                    <p>Emission Scope 1&2</p>
                                    <p>Emission Scope 3</p>
                                </div>
                            </div>
                            <Card shadow>
                             <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
                            </Card>
                        </div>
                        <div class="canvas_box">
                            <div class="top_canvas">
                                <div class="left_canvas">
                                    <p class="name">Emission</p>
                                    <div class="types">
                                        <p>Quarter</p>
                                        <p>Month</p>
                                        <p class="active">Day</p>
                                    </div>
                                </div>
                                <div class="right_canvas">
                                    <p>Emission Scope 1&2</p>
                                    <p>Emission Scope 3</p>
                                </div>
                            </div>
                            <div>
                                <Card shadow>
                                    <example style="height: 310px;"/>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="right_top">
                    <p class="title">CO2e Emission</p>
                    <p class="sup_title">Total Emission</p>
                    <p class="title_count">
                        <span class="title_add">1,265,823t </span>
                        <span>CO2e</span>
                    </p>
                     <!-- <Card shadow> -->
                    <chart-pie style="height: 120px;" :value="pieData"></chart-pie>
                    <!-- </Card> -->
                </div>
                <div class="right_top right_bottom">
                    <p class="title">Scope 1& Scope 2 CO2e Emission</p>
                    <p class="sup_title">Total Emission</p>
                    <p class="title_count">
                        <span class="title_add">1,265,823t </span>
                        <span>CO2e</span>
                    </p>
                     <!-- <Card shadow> -->
                    <chart-pie style="height: 120px;" :value="pieData2"></chart-pie>
                    <!-- </Card> -->
                    <div class="right_progress">
                        <div class="top">
                            <p class="top_left">SMT：1,265,823t</p>
                            <p class="top_percent">25%</p>
                        </div>
                        <Progress :percent="25" hide-info :status="'SMT'"/>
                    </div>
                    <div class="right_progress">
                        <div class="top">
                            <p class="top_left">THT：1,265,823t</p>
                            <p class="top_percent">25%</p>
                        </div>
                        <Progress :percent="25" hide-info :status="'SMT THT'"/>
                    </div>
                    <div class="right_progress">
                        <div class="top">
                            <p class="top_left">Assembling：1,265,823t</p>
                            <p class="top_percent">25%</p>
                        </div>
                        <Progress :percent="25" hide-info :status="'SMT Assembling'"/>
                    </div>
                    <div class="right_progress">
                        <div class="top">
                            <p class="top_left">Public utilities：1,265,823t</p>
                            <p class="top_percent">25%</p>
                        </div>
                        <Progress :percent="25" hide-info :status="'SMT Public utilities'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import example from '../single-page/home/example.vue'
import { ChartPie, ChartBar } from '_c/charts'
import {getChartData} from "@/api/home"
// import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    example,
    ChartBar,
    ChartPie
  },
  data () {
    return {
      querForm:{
          year: null,
          factory:null
      },
      countData:{},
      topList: [
        { title: 'Products', id: 0, count:0 },
        { title: 'Total Products', id: 1, count:0 },
        { title: 'Total Components', id: 2, count:0 },
        { title: 'Supplies', id: 3, count:0 }
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
      pieData: [
        { value: 400, name: '直接访问', itemStyle: { color: '#006D80' } },
        { value: 300, name: '邮件营销', itemStyle: { color: '#00D3C9' } }
        // { value: 298, name: '联盟广告', itemStyle: { color: '#99B6FF' } },
        // { value: 248, name: '视频广告', itemStyle: { color: '#FFA722' } },
        // { value: 268, name: '搜索引擎', itemStyle: { color: '#FFCD81' } }
      ],
      pieData2: [
        { value: 400, name: '直接访问', itemStyle: { color: '#006D80' } },
        { value: 300, name: '邮件营销', itemStyle: { color: '#00D3C9' } },
        { value: 298, name: '联盟广告', itemStyle: { color: '#A4DC94' } },
        { value: 248, name: '视频广告', itemStyle: { color: '#FFE898' } }
      ]
    }
  },
  computed: {
    productList () {
        console.log(this.$store.state.app.productList,"////")
      return this.$store.state.app.productList
    }
  },
  methods:{
      gotoHitory() {
          this.$router.push("/emission/history");
          console.log(this.$route)
      },
      queryData() {
          getChartData({...querForm}).then(res=>{
              if(res.code == 0) {
                  this.topList[0].count = res.data.module_count;
                  this.topList[1].count = res.data.product_count;
                  this.topList[2].count = res.data.component_count;
                  this.topList[3].count = res.data.supplier_count;
              }else {
                  this.countData = {
                    module_count: 0,
                    product_count: 0,
                    component_count: 0,
                    supplier_count: 0
                  }
              }
          })
      }
  }
}
</script>
<style lang="less" scoped>
.big_box {
    .top {
        display: flex;
        p {
            color: #11435C;
            font-size: 18px;
        }
        ::v-deep {
            .ivu-select {
                color: #11435C;
                margin-left: 20px;
                .ivu-select-selection {
                    border-color:#11435C;
                }
            }
        }
        .ivu-date-picker {
            margin-left: 20px;
            ::v-deep {
                .ivu-date-picker-rel {
                    .ivu-input-wrapper {
                        .ivu-input-inner-container {
                            .ivu-input {
                                border-color: #11435C;
                            }
                        }
                    }
                }
            }
        }
    }
    .content_box {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .left {
            width: 75%;
            .top {
                padding: 20px;
                background: #fff;
                display: flex;
                flex-direction: column;
                .title {
                    font-size: 18px;
                    color: #11435C;
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
                    background: #11435C;
                    opacity: 0.12;
                }
                .list {
                    margin-top: 20px;
                    ul {
                        padding: 0;
                        margin: 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        li {
                            display: flex;
                            align-items: center;
                            .icon_box {
                                width: 54px;
                                height: 54px;
                                background: rgba(0, 109, 128, 0.06);
                                border-radius: 27px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                p {
                                    width: 20px;
                                    height: 20px;
                                }
                                .icon0 {
                                    background: url("../../assets/images/icon0.svg") no-repeat center;
                                    background-size: cover;
                                }
                                .icon1 {
                                    background: url("../../assets/images/icon1.svg") no-repeat center;
                                    background-size: cover;
                                }
                                .icon2 {
                                    background: url("../../assets/images/icon2.svg") no-repeat center;
                                    background-size: cover;
                                }
                                .icon3 {
                                    background: url("../../assets/images/icon3.svg") no-repeat center;
                                    background-size: cover;
                                }
                            }
                            .list_right {
                                margin-left: 10px;
                                .number {
                                    color: #000000;
                                    font-size: 24px;
                                    font-weight: 800;
                                }
                                .number_bottom {
                                    color: #000;
                                    opacity: 0.6;
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }
            .bottom {
                margin-top: 10px;
                padding: 20px;
                background: #fff;
                .bottom_top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left {
                        display: flex;
                        align-items: center;
                        .title {
                            font-size: 18px;
                            color: #11435C;
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
                            background: #11435C;
                            opacity: 0.12;
                        }
                        .sup_title {
                            font-size: 14px;
                            color: #000;
                            opacity: 0.3;
                            margin-left: 10px;
                            padding-top: 10px;
                        }
                    }
                    .right {
                        .ivu-btn-text {
                            color: #11435C;
                        }
                    }
                }
                .bottom_content {
                    margin-top: 20px;
                    .canvas_box {
                       margin-top: 20px;
                        .top_canvas {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .left_canvas {
                                display: flex;
                                align-items: center;
                                .name {
                                    font-size: 16px;
                                    color: #11435C;
                                }
                                .types {
                                    margin-left: 10px;
                                    display: flex;
                                    align-items: center;
                                    p {
                                        margin-left: 10px;
                                        color: #000;
                                        opacity: 0.6;
                                        font-size: 14px;
                                    }
                                    .active {
                                        color: #11435C;
                                        opacity: 1;
                                    }
                                }
                            }
                            .right_canvas {
                                display: flex;
                                align-items: center;
                                p {
                                    font-size: 14px;
                                    margin-left: 20px;
                                    position: relative;
                                }
                                p::before {
                                    content: "";
                                    width: 8px;
                                    height: 8px;
                                    position: absolute;
                                    left: -10px;
                                    bottom: 7px;
                                    border-radius: 4px;
                                    display: block;
                                    background: #11435C;
                                }
                                .first_p::before {
                                    background: #A4DC94;
                                }
                            }
                        }
                    }
                }
            }
        }
        .right {
            width: 24%;
            display: flex;
            flex-direction: column;

            .right_top {
                background: #fff;
                padding: 20px;
                .title {
                    font-size: 18px;
                    color: #11435C;
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
                    background: #11435C;
                    opacity: 0.12;
                }
                .sup_title {
                    margin-top: 10px;
                    color: #000;
                    opacity: 0.6;
                    font-size: 14px;
                }
                .title_count {
                    margin-top: 10px;
                    font-size: 14px;
                        .title_add {
                            color: #000;
                            font-weight: 800;
                        }
                }
            }
            .right_bottom {
                margin-top: 20px;
                flex: 1;
                .right_progress {
                    margin-top: 20px;
                    .top {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        p {
                            font-size: 14px;
                        }
                        .top_left {
                            color: #000;
                            opacity: 0.6;
                        }
                        .top_percent {
                            color: #000;
                        }
                    }
                    .ivu-progress-SMT {
                        ::v-deep {
                            .ivu-progress-outer {
                                .ivu-progress-inner {
                                    border-radius: 0;
                                    .ivu-progress-bg {
                                        height: 6px !important;
                                        border-radius: 0;
                                        background: #006D80;
                                    }
                                }
                            }
                        }
                    }
                    .THT {
                        ::v-deep {
                            .ivu-progress-outer {
                                .ivu-progress-inner {
                                    border-radius: 0;
                                    .ivu-progress-bg {
                                        height: 6px !important;
                                        border-radius: 0;
                                        background: #00D3C9;
                                    }
                                }
                            }
                        }
                    }
                    .Assembling {
                        ::v-deep {
                            .ivu-progress-outer {
                                .ivu-progress-inner {
                                    border-radius: 0;
                                    .ivu-progress-bg {
                                        height: 6px !important;
                                        border-radius: 0;
                                        background: #A4DC94;
                                    }
                                }
                            }
                        }
                    }
                    .utilities {
                        ::v-deep {
                            .ivu-progress-outer {
                                .ivu-progress-inner {
                                    border-radius: 0;
                                    .ivu-progress-bg {
                                        height: 6px !important;
                                        border-radius: 0;
                                        background: #FFE898;
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }
}
</style>
