"use client";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";
import React from "react";
import { Chart as ReactChart } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(...registerables);

interface LineProps {
  data: {[key:string]:any[][]};
  color:string;
  diagramKey:string,
  type: "line"|"bar"|"pie"|"radar",
  title?:string,
}

export const MarketChart= ({type, data:getData, title,color,diagramKey }:LineProps) => {

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
    <div className="w-full h-64 flex flex-col justify-center items-center">
      <p className={"text-2xl font-medium"}>{title?title:"Deine "+diagramKey}</p>
      <ReactChart type={type} data={data} options={options} />
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