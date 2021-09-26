<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartPie',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let legend = this.value.map(_ => _.name)
      let valus = this.value
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center', // 水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: 'bottom', // 垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'normal',
            color: '#333333'
          },
          left: '25%',
          top: '80%',
          textAlign: 'center' // 标题始终和图表保持居中
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c} ({d}%)', // 处理hover显示的文本
          textStyle: {
            fontSize: '12'
          }
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: legend,
        //   x : 'right',
        //   y : 'center',
        // },
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          x: 'right',
          y: 'center',
          orient: 'vertical', // 设置图例排列纵向显示
          align: 'left', // 设置图例中文字位置在icon标识符的右侧
          left: '40%',
          top: 'center',
          itemGap: 10, // 设置图例之间的间距
          padding: [0, 0, 0, 0], // 设置图例与圆环图之间的间距
          formatter: function (name) {
            // 该函数用于设置图例显示后的百分比
            var total = 0
            var value
            valus.forEach((item) => {
              total += item.value
              if (item.name === name) {
                value = item.value
              }
            })
            var p = ((value / total) * 100).toFixed(1) // 求出百分比,保留2位小数
            // return `${name}  ${value}件  ${p}%`
            return `{a|${name}}{b|${value}CO2e}{c|${p}%}` // 返回出图例所显示的内容是名称+百分比
          },
          // 自定义图例文字样式
          textStyle: {
            rich: {
              a: {
                color: '#333333',
                padding: [0, 10, 0, 0],
                fontSize: 12
              },
              b: {
                color: '#666666',
                padding: [0, 10, 0, 0],
                fontSize: 12
              },
              c: {
                color: '#666666',
                fontSize: 12
              }
            }
          }
        },

        series: [
          {
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['20%', '50%'],
            data: this.value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              show: false
            },
            label: {
              show: false,
              position: 'center'
            }
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
