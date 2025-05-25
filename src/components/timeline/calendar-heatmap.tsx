"use client";
import React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import { warehouseType } from '@/types/blog'
export default ({ warehouse }: { warehouse: warehouseType }) => {
  const heatmap_width = (e) => {
    var t = new Date(),
      o = t.setMonth(t.getMonth() - e),
      n = +new Date(),
      t = +new Date(o),
      n = echarts.format.formatTime('yyyy-MM-dd', n),
      t = echarts.format.formatTime('yyyy-MM-dd', t),
      s = []
    return s.push([t, n]), s
  }
  const getRangeArr = () => {
    return heatmap_width(12)
  }
  const options = {
    title: {
      top: 0,
      left: 'center',
      text: '博客产量'
    },
    tooltip: {
      hideDelay: 1e3,
      enterable: !0,
      formatter: function (e: any) {
        return `${e.data[0]} - ${e.data[1]} 篇文章`
      }
    },
    visualMap: {
      min: 0,
      max: 6,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 30,
      inRange: {
        color: ['#7aa8744c', '#7AA874']
      },
      splitNumber: 3,
      text: ['文章篇数', ''],
      showLabel: !0,
      itemGap: 30
    },

    calendar: {
      top: 80,
      left: 20,
      right: 4,
      cellSize: ['auto', 12],
      range: getRangeArr(),
      itemStyle: {
        color: '#F1F1F1',
        borderWidth: 2.5,
        borderColor: '#fff'
      },
      yearLabel: {
        show: !1
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.0)'
        }
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: warehouse
    }
  }

  return (
    <div className="w-full bg-white-500  rounded-lg shadow-lg border border-white-500 p-4 mt-4">
      <ReactECharts option={options} className="!h-44" />
    </div>
  )
}