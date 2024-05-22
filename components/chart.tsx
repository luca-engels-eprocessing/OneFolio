"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface LineProps {
  data: {[key:string]:any[][]};
  color:string;
  diagramKey:string,
  type: "line"|"bar"|"pie"|"radar"
}

export const MarketChart= ({type, data:getData,color,diagramKey }:LineProps) => {

  const chartData = getData[diagramKey]

  if(!chartData){
    return(
    <div>
      Du musst dich einloggen und Investments erstellt haben um deine Investments zu sehen
    </div>)
  }
  const data = {
    labels: chartData.map((entry: any) => entry[0]),
    datasets: [
      {
        label: diagramKey,
        data: chartData.map((entry: any) => entry[1]),
        borderColor: color,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };
  return(
    <div className="w-full h-64 flex justify-center items-center">
      <Chart type={type} data={data} options={options} />
    </div>
  )
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      min:0,
    }

  },
};