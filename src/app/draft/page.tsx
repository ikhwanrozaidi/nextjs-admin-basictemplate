"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { motion } from "framer-motion";

const DraftPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const slideInFromLeft = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
  };

  const TotalOrdersChartOpts: ApexOptions = {
    series: [65],
    chart: {
      type: "radialBar",
      height: 81,
      width: 81,
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        hollow: {
          margin: 0,
          size: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 5,
            fontSize: "14px",
            fontWeight: "600",
            formatter: function (val: any) {
              return val + "k";
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -18,
        bottom: -20,
        left: -20,
        right: -20,
      },
    },
    colors: ["#ff5b5b", "#F6F7FB"],
  };

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex bg-white p-8 rounded-[1rem] shadow-lg max-w-[30rem] justify-between items-end"
      >
        <div className="flex-row">
          <motion.div
            variants={slideInFromLeft}
            className="text-black mb-5 text-l font-semibold"
          >
            Total Orders
          </motion.div>

          <motion.div
            variants={slideInFromLeft}
            className="flex justify-center"
          >
            <ReactApexChart
              height={91}
              width={91}
              options={TotalOrdersChartOpts}
              series={TotalOrdersChartOpts.series}
              type="radialBar"
            />
          </motion.div>
        </div>

        <motion.div variants={slideInFromLeft} className="text-center mt-4">
          <h3 className="text-2xl font-semibold text-gray-800">687.3k</h3>
          <p className="text-gray-500">Since last month</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DraftPage;
