"use client";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";
import React, { useEffect, useState, ChangeEvent } from "react";
import { Chart as ReactChart } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(...registerables);

interface LineProps {
  data: {[key:string]:any}[][];
  diagramKey:string,
  type: "bar"|"pie"|"radar",
}

export const MarketChart = ({type,data,diagramKey}:LineProps) => {
  const [diagramValueX,setDiagramValueX] = useState<string>(diagramKey);
  let isDarkTheme =false
  if(typeof window != "undefined"&&window&&window.matchMedia){
    isDarkTheme=window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const [diagramValueY,setDiagramValueY] = useState<string>("Summe");
  const [diagramType,setDiagramType] = useState<"bar"|"pie"|"radar">(type);
  const [chartData, setChartData] = useState<any[][]>();

  const onChange=(e:ChangeEvent,direction:"x"|"y"|"type") => {
    e.preventDefault()
    const selectedValue = (e.target as HTMLSelectElement).value
    if(direction=="x"){
      setDiagramValueX(selectedValue)
    }
    else if(direction=="y"){
      setDiagramValueY(selectedValue)
    }
    else{
      setDiagramType(selectedValue as "bar"|"pie"|"radar")
    }
  }
  useEffect(() => {
    const tempCharData:any[][] = []

    //! ONLY WORKS FOR BAR AND PIE Graphs with number values
    data.forEach((item) => {
      if(isKeyInList(diagramValueY,item)){
        const x = getKeyFromList(diagramValueX,item)
        const y = Number.parseInt(getKeyFromList(diagramValueY,item))
        if(x && y){
          const index = getIndexFromKey(x,tempCharData)
          if(index>=0){
            tempCharData[index] = [x,tempCharData[index][1]+y]
          }
          else{
            tempCharData.push([x,y])
          }
        }
        else{
          const index = getIndexFromKey(diagramValueY,tempCharData)
          if(index>=0){
            tempCharData[index] = ["Sonstige...",tempCharData[index][1]+y]
          }
          else{
            tempCharData.push(["Sonstige...",y])
          }
        }
      }
    });
    setChartData(tempCharData)
  }, [data,diagramValueX,diagramValueY]);

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

  const GraphData = {
    labels: chartData.map((entry: any) => entry[0]),
    datasets: [
      {
        label: diagramValueX,
        data: chartData.map((entry: any) => entry[1]),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };
  const listKeys:string[] = []
  data.forEach(item => {
    item.forEach(keys => {
      if(!listKeys.includes(keys.key)){
        listKeys.push(keys.key)
      }
    })
  })
  listKeys.sort((a,b)=>a.localeCompare(b))

  return(
    <div className="xl:w-full max-w-[50vw] flex flex-col justify-center items-start gap-y-4">
      <p className={"xl:text-2xl text-lg font-medium"}>{"Deine "+diagramValueX}</p>
      <div className="flex xl:flex-row flex-col gap-2 w-[40%]">
        <select name="inputType" id="inputType" className='bg-prim xl:text-xl text-xs' defaultValue={diagramValueX} onChange={(e)=>onChange(e,'x')}>
          {listKeys.map((valueKey,index)=>{
            return(<option key={index} value={valueKey}>{valueKey}</option>)
          })}
        </select>
        <div className="flex flex-row gap-2">
          <p className="xl:text-lg text-xs">Diagramm:</p>
          <select name="ChartType" id="ChartType" className='bg-prim xl:text-lg text-xs' defaultValue={diagramType} onChange={(e)=>onChange(e,'type')}>
            <option value="bar">Bar</option>
            <option value="pie">Kreis</option>
            <option value="radar">Netz</option>
          </select>
        </div>
      </div>
      <div className="xl:hidden flex">
        <ReactChart type={diagramType} width={`${window.innerWidth/2}px`} height={`${window.innerWidth/2}px`} data={GraphData} options={options} />
      </div>
      <div className="hidden xl:flex">
        <ReactChart type={diagramType} data={GraphData} options={{...options,plugins:{legend:{position:"right"}}}}/>
      </div>
    </div>
  )
};

export const options = {
  responsive: true,
  maintainAspectRatio: false ,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};


export function generateGradientHexList(startColor: string, endColor: string, steps: number,alpha?:boolean): string[] {
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

  if(steps ==1){
    const g = Math.round((end.r + start.r) / 2).toString(16).padStart(2, '0');
    const b = Math.round((end.g + start.g) / 2).toString(16).padStart(2, '0');
    const r = Math.round((end.b + start.b) / 2).toString(16).padStart(2, '0');
    return [alpha?`#${r}${g}${b}80`:`#${r}${g}${b}`];
  }
  const step = {
      r: (end.r - start.r) / (steps - 1),
      g: (end.g - start.g) / (steps - 1),
      b: (end.b - start.b) / (steps - 1),
    };
  return Array.from({length: steps}, (_, i) => {
    const r = Math.round(start.r + step.r * i).toString(16).padStart(2, '0');
    const g = Math.round(start.g + step.g * i).toString(16).padStart(2, '0');
    const b = Math.round(start.b + step.b * i).toString(16).padStart(2, '0');
    return alpha?`#${r}${g}${b}80`:`#${r}${g}${b}`;
  });
}

export const isKeyInList = (key: string, list: {[key:string]:any}[]): boolean => {
  return list.some((item) => item.key === key);
}

export const getIndexFromKey = (key: string, list: any[][]): number => {
  console.log(key)
  for (let i = 0; i < list.length; i++) {
    if (list[i][0] === key) {
      return i;
    }
  }
  return -1; // Return -1 if the key is not found
}

export const getKeyFromList = (key: string, list: {[key:string]:any}[]): string => {
  return list.find((item) => item.key === key)?.value;
}

