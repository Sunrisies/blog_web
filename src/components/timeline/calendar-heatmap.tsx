"use client"
import type { warehouseType } from "@/types/blog";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import React from "react";

interface CalendarHeatmapProps {
  warehouse: warehouseType;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ warehouse }) => {
  const heatmapWidth = (months: number): [string, string][] => {
    const now = new Date();
    const past = new Date(now);
    past.setMonth(now.getMonth() - months);
    const nowStr = echarts.format.formatTime("yyyy-MM-dd", now);
    const pastStr = echarts.format.formatTime("yyyy-MM-dd", past);
    return [[pastStr, nowStr]];
  };

  const getRangeArr = (): [string, string][] => {
    return heatmapWidth(12);
  };

  const options = {
    title: {
      top: 0,
      left: "center",
      text: "博客产量"
    },
    tooltip: {
      hideDelay: 1000,
      enterable: true,
      formatter: function (e: any) {
        return `${e.data[0]} - ${e.data[1]} 篇文章`;
      }
    },
    visualMap: {
      min: 0,
      max: 6,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 30,
      inRange: {
        color: ["#7aa8744c", "#7AA874"]
      },
      splitNumber: 3,
      text: ["文章篇数", ""],
      showLabel: true,
      itemGap: 30
    },
    calendar: {
      top: 80,
      left: 20,
      right: 4,
      cellSize: ["auto", 12],
      range: getRangeArr(),
      itemStyle: {
        color: "#F1F1F1",
        borderWidth: 2.5,
        borderColor: "#fff"
      },
      yearLabel: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(0, 0, 0, 0.0)"
        }
      }
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: warehouse
    }
  };

  return (
    <div className="w-full bg-white-500 rounded-lg shadow-lg border border-white-500 p-4 mt-4">
      <ReactECharts option={options} className="!h-44" />
    </div>
  );
};
