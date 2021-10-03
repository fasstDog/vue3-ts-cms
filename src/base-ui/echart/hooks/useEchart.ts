import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china',chinaMapData)

export default function (el:HTMLElement) {
  const echartInstance = echarts.init(el)


  const setOptions = (options:echarts.EChartsCoreOption)=>{
    echartInstance.setOption(options)
  }

  const updateResize= ()=>{
    echartInstance.resize()
  }

  window.addEventListener('resize',()=>{
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
