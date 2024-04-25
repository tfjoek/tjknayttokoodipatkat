"use client";

import { Colors } from "@/utils/colors";
import ApexChart from "react-apexcharts";

export interface Props {
  title: string;
  description: string;
  series: number[];
  labels: string[];
}

export default function CheckChart({
  series,
  labels,
  title,
  description,
}: Props) {
  const options = {
    labels: labels,
    chart: {
      type: "donut",
      height: "100%",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    dataLabels: {
      enabled: false,
      dropShadow: {
        enabled: false,
      },
    },
    colors: [Colors.exception, Colors.green],
  };

  return (
    <div className="flex-col items-center bg-white rounded-lg p-4 md:p-6">
      <div>
        <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
          {title}
        </h5>
        <p className="text-base font-normal text-gray-500">{description}</p>
      </div>

      <div className="mt-10">
        <ApexChart
          height={200}
          options={options}
          series={series}
          type="donut"
        />
      </div>
    </div>
  );
}
