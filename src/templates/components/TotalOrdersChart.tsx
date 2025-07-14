"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Props {
  options: ApexOptions;
  series: number[];
  height?: number;
  width?: number;
  type?: "radialBar" | "bar" | "line" | string;
}

export default function TotalOrdersChart({
  options,
  series,
  height = 81,
  width = 81,
  type = "radialBar",
}: Props) {
  return (
    <ReactApexChart
      options={options}
      series={series}
      height={height}
      width={width}
      type={type}
    />
  );
}
