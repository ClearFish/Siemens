<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props:['value'],
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
    console.log(this.value,"[]===");
    // var arr = [['product', 'SMT', 'THT', 'Assembling','Public utilities']];
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      let option = {
        // title: {
        //   text: this.text,
        //   subtext: this.subtext,
        //   x: 'center'
        // },
        // xAxis: {
        //   type: 'category',
        //   data: xAxisData
        // },
        // yAxis: {
        //   type: 'value'
        // },
        // series: [{
        //   data: seriesData,
        //   type: 'bar'
        // }]
        color:["#006D80","#00D3C9","#A4DC94","#FFE898"],
        dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 0,
                  end: 2
              },
              {
                  type: 'inside',
                  realtime: true,
                  start: 0,
                  end: 2
              }
          ],
          legend: {
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            x: 'right',
            y: 'top',
          },
          tooltip: {
            formatter:function(val) {
              // console.log(val,"[]===")
              return '<div>'+val.dimensionNames[val.componentIndex+1]+'</div>' +
                  '<div>'+(val.data[val.componentIndex+1]).toFixed(3)+'</div>'
            }
          },
          dataset: {
            source: this.value
            // [
            //   ['product', 'SMT', 'THT', 'Assembling','Public utilities'],
            //   ['Q1', 43.3, 85.8, 93.7,33.7],
            //   ['Q2', 83.1, 73.4, 55.1,46.9],
            //   ['Q3', 86.4, 65.2, 82.5,90.2],
            //   ['Q4', 72.4, 53.9, 39.1,25.7]
            // ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [
            { type: 'bar',backgroundStyle:{color:"#006D80"}}, 
            { type: 'bar',backgroundStyle:{color:"#00D3C9"}}, 
            { type: 'bar',backgroundStyle:{color:"#A4DC94"}},
            { type: 'bar',backgroundStyle:{color:"#FFE898"}}
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
