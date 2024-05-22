"use client";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";
import React, { useEffect, useState } from "react";
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
function generateGradientHexList(startColor: string, endColor: string, steps: number,alpha?:boolean): string[] {
  const start = {
    r: parseInt(startColor.slice(0, 2), 16),
    g: parseInt(startColor.slice(2, 4), 16),
    b: parseInt(startColor.slice(4, 6), 16)
  };
  const end = {
    r: parseInt(endColor.slice(0, 2), 16),
    g: parseInt(endColor.slice(2, 4), 16),
    b: parseInt(endColor.slice(4, 6), 16)
  };

  const step = {
    r: (end.r - start.r) / (steps - 1),
    g: (end.g - start.g) / (steps - 1),
    b: (end.b - start.b) / (steps - 1)
  };

  return Array.from({length: steps}, (_, i) => {
    const r = Math.round(start.r + step.r * i).toString(16).padStart(2, '0');
    const g = Math.round(start.g + step.g * i).toString(16).padStart(2, '0');
    const b = Math.round(start.b + step.b * i).toString(16).padStart(2, '0');
    return alpha?`#${r}${g}${b}80`:`#${r}${g}${b}`;
  });
}

export const MarketChart= ({type, data:getData, title,color,diagramKey }:LineProps) => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [chartData, setChartData] = useState<any[][]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("chartData:", getData);
        setChartData(getData[diagramKey]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData]);

  
  if (!chartData) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
      </div>
    );
  }
  let borderColor
  let backgroundColor
  if(isDarkTheme){
    borderColor = generateGradientHexList("c68700","ffcf00",chartData.length)
    backgroundColor = generateGradientHexList("c68700","ffcf00",chartData.length,true)
  }
  else{
    borderColor = generateGradientHexList("284cb3","385eff",chartData.length)
    backgroundColor = generateGradientHexList("284cb3","385eff",chartData.length,true)
  }
  
  const data = {
    labels: chartData.map((entry: any) => entry[0]),
    datasets: [
      {
        label: diagramKey,
        data: chartData.map((entry: any) => entry[1]),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };
  return(
    <div className="w-full h-64 flex flex-col justify-center items-start">
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