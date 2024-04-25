"use client";

import { ChecksForDay, TimedSummary } from "@/lib/type/summary/timedSummary";
import { Colors } from "@/utils/colors";
import { DateTimeUtil } from "@/utils/dateTime";
import ApexChart from "react-apexcharts";

export interface Props {
  checks: ChecksForDay[];
  title: string;
  description: string;
}

export default function CheckChart({
  checks: checksPerDay,
  title,
  description,
}: Props) {
  const xAxisData = checksPerDay.map((it) => {
    return DateTimeUtil.format(DateTimeUtil.parse(it.date), "ddd");
  });

  const yAxisData = checksPerDay.map((it) => {
    return it.checkInfos.length;
  });

  const options = {
    chart: {
      id: "check-line-chart",
      fontFamily: "Inter, sans-serif",
      height: "100%",
      width: "100%",
      type: "area",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      redrawOnParentResize: true,
    },
    xaxis: {
      categories: xAxisData,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 6,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0.9,
        shade: Colors.main,
        gradientToColors: [Colors.main],
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: true,
    },
  };

  const series = [
    {
      name: "Completed checks for the day",
      data: yAxisData,
      color: Colors.main,
    },
  ];

  return (
    <div className="flex-col bg-white rounded-lg shadow p-4 md:p-6">
      <div>
        <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
          {title}
        </h5>
        <p className="text-base font-normal text-gray-500">{description}</p>
      </div>

      <div className="mt-4">
        <ApexChart height={200} options={options} series={series} type="line" />
      </div>
    </div>
  );
}
