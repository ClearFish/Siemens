<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: ["xdata", "data1", "data2"],
  data() {
    return {
      dom: null,
    };
  },
  watch: {
    xdata: {
      handler: function (val, oldval) {
        if (val != oldval) {
          console.log(val, "改变了");
          this.resetEcharts(val, this.data1, this.data2);
        }
      },
      deep: true,
    },
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    resetEcharts(xdata, data1, data2) {
      console.log(xdata, data1, data2, "///gaibianzhi ");
      var _this = this;
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#006D80",
            },
          },
          formatter: function (val) {
            return (
              `<div><span>${_this.$t("Emission_Scope_1_2")}：</span>` +
              val[0].data.toFixed(3) +
              "</div>" +
              `<div><span>${_this.$t("Emission_Scope_3_M")}：</span>` +
              val[1].data.toFixed(3) +
              "</div>"
            );
          },
        },
        color: ["#A4DC94", "#00D3C9"],
        grid: {
          top: "10%",
          left: "1.2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ['Q1', 'Q2', 'Q3', 'Q4']
            data: xdata,
          },
        ],
        legend: {
          data: [
            _this.$t("Emission_Scope_1_2"),
            _this.$t("Emission_Scope_3_M"),
          ],
          icon: "circle",
          left: "right",
          top: 0,
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: _this.$t("Emission_Scope_1_2"),
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#A4DC94",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: "#A4DC94",
              },
            },
            // data: [120, 132, 101, 134]
            data: data1,
          },
          {
            name: _this.$t("Emission_Scope_3_M"),
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#00D3C9",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: "#00D3C9",
              },
            },
            // data: [257, 358, 278, 234]
            data: data2,
          },
          // {
          //   name: '游戏/视频',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: { normal: {
          //     color: '#0C17A6'
          //   } },
          //   data: [379, 268, 354, 269, 310, 478, 358]
          // },
          // {
          //   name: '餐饮/外卖',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: { normal: {
          //     color: '#4608A6'
          //   } },
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          // {
          //   name: '快递/电商',
          //   type: 'line',
          //   stack: '总量',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'top'
          //     }
          //   },
          //   areaStyle: { normal: {
          //     color: '#398DBF'
          //   } },
          //   data: [820, 645, 546, 745, 872, 624, 258]
          // }
        ],
      };
      this.dom.clear();
      this.dom.setOption(option, true);
    },
    initCharts() {
      var _this = this;
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#006D80",
            },
          },
          formatter: function (val) {
            return (
              `<div><span>${_this.$t("Emission_Scope_1_2")}：</span>` +
              val[0].data.toFixed(3) +
              "</div>" +
              `<div><span>${_this.$t("Emission_Scope_3_M")}：</span>` +
              val[1].data.toFixed(3) +
              "</div>"
            );
          },
        },
        color: ["#A4DC94", "#00D3C9"],
        grid: {
          top: "10%",
          left: "1.2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ['Q1', 'Q2', 'Q3', 'Q4']
            data: this.xdata,
          },
        ],
        legend: {
          data: [
            _this.$t("Emission_Scope_1_2"),
            _this.$t("Emission_Scope_3_M"),
          ],
          icon: "circle",
          left: "right",
          top: 0,
        },
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: _this.$t("Emission_Scope_1_2"),
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#A4DC94",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: "#A4DC94",
              },
            },
            // data: [120, 132, 101, 134]
            data: this.data1,
          },
          {
            name: _this.$t("Emission_Scope_3_M"),
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#00D3C9",
                    },
                    {
                      offset: 1,
                      color: "#fff",
                    },
                  ],
                  false
                ),
              },
            },
            lineStyle: {
              normal: {
                width: 3,
                color: "#00D3C9",
              },
            },
            // data: [257, 358, 278, 234]
            data: this.data2,
          },
          // {
          //   name: '游戏/视频',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: { normal: {
          //     color: '#0C17A6'
          //   } },
          //   data: [379, 268, 354, 269, 310, 478, 358]
          // },
          // {
          //   name: '餐饮/外卖',
          //   type: 'line',
          //   stack: '总量',
          //   areaStyle: { normal: {
          //     color: '#4608A6'
          //   } },
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          // {
          //   name: '快递/电商',
          //   type: 'line',
          //   stack: '总量',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'top'
          //     }
          //   },
          //   areaStyle: { normal: {
          //     color: '#398DBF'
          //   } },
          //   data: [820, 645, 546, 745, 872, 624, 258]
          // }
        ],
      };
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    },
  },
  mounted() {
    this.dom = echarts.init(this.$refs.dom);
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
};
</script>
