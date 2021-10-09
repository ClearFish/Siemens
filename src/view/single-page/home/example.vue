<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
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
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#006D80'
          }
        }
      },
      color:["#A4DC94","#00D3C9"],
      grid: {
        top: '3%',
        left: '1.2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Q1', 'Q2', 'Q3', 'Q4']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Emission Scope 1&2',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:'#A4DC94'
                            },
                            {
                                offset:1,
                                color:'#fff'
                            }
                        ],false)
          } },
          lineStyle:{
              normal:{
                  width:3,
                  color:'#A4DC94'

              }
          },
          data: [120, 132, 101, 134]
        },
        {
          name: 'Emission Scope 3',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {
            color:new echarts.graphic.LinearGradient(0,0,0,1,[
                            {
                                offset:0,
                                color:'#00D3C9'
                            },
                            {
                                offset:1,
                                color:'#fff'
                            }
                        ],false)
          } },
          lineStyle:{
              normal:{
                  width:3,
                  color:'#00D3C9'

              }
          },
          data: [257, 358, 278, 234]
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
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
