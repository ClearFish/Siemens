<template>
    <div class="big_box">
        <div class="top">
            <p>Factory Emission</p>
            <Select v-model="year" style="width:120px">
                <Option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
            <Select v-model="year" style="width:120px">
                <Option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
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
                                    <p class="number">123</p>
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
                        <Button type="text">Load More</Button>
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
                     <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData"></chart-pie>
        </Card>
                </div>
                <div class="right_bottom"></div>
            </div>
        </div>
    </div>
</template>
<script>
import example from '../single-page/home/example.vue'
import { ChartPie, ChartBar } from '_c/charts'
export default {
  components: {
    example,
    ChartBar,
    ChartPie
  },
  data () {
    return {
      year: null,
      cityList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqing',
          label: '重庆市'
        }
      ],
      topList: [
        { title: 'Products', id: 0 },
        { title: 'Total Products', id: 1 },
        { title: 'Total Components', id: 2 },
        { title: 'Supplies', id: 3 }
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
        { value: 400, name: '直接访问', itemStyle: { color: '#2661FF' } },
        { value: 300, name: '邮件营销', itemStyle: { color: '#638EFF' } },
        { value: 298, name: '联盟广告', itemStyle: { color: '#99B6FF' } },
        { value: 248, name: '视频广告', itemStyle: { color: '#FFA722' } },
        { value: 268, name: '搜索引擎', itemStyle: { color: '#FFCD81' } }
      ]
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
                                    height: 14px;
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
                            }
                        }
                    }
                }
            }
        }
        .right {
            width: 24%;
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
        }
    }
}
</style>
