"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import React,{ useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface LineProps {
  id: string;
  color:string;
}

export const MarketChart: React.FC<LineProps> = ({ id,color }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {prices:[[1,15],[2,21],[3,41],[4,15],[5,11],[6,31]]}
        console.log("chartData:", data);
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!chartData || !chartData.prices) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }
  const { prices } = chartData;

  const data = {
    labels: prices.map((entry: any) => entry[0]),
    datasets: [
      {
        label: "Preise (EUR)",
        data: prices.map((entry: any) => entry[1]),
        borderColor: color,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Line  height={"80%"} data={data} />
    </div>
  );
};