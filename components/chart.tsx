"use client";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import { Select, SelectItem, SelectTrigger } from "./ui/select";
import { SelectContent, SelectGroup, SelectLabel, SelectValue } from "@radix-ui/react-select";

// Register ChartJS components using ChartJS.register
ChartJS.register(...registerables);

interface LineProps {
  data: {key:string,value:string}[][];
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

  const onChange=(e:string,direction:"x"|"y"|"type") => {
    if(direction=="x"){
      setDiagramValueX(e)
    }
    else if(direction=="y"){
      setDiagramValueY(e)
    }
    else{
      setDiagramType(e as "bar"|"pie"|"radar")
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
          const index = getIndexFromKey("Sonstige...",tempCharData)
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


  const GraphData = {
    labels: chartData.map((entry: any) => entry[0]),
    datasets: [
      {
        label: diagramValueX,
        data: chartData.map((entry: any) => entry[1]),
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
      <p className={"text-big font-medium"}>{"Deine "+diagramValueX}</p>
      <div className="flex xl:flex-row flex-col gap-2">
        <div>
          <Select onValueChange={(e)=>onChange(e,'x')} defaultValue={diagramValueX}>
            <SelectTrigger className="w-[180px] border-def">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-sec border-def rounded-md h-[200px] overflow-y-scroll ">
                <SelectLabel>Kategorien</SelectLabel>
                {listKeys.map((valueKey,index)=>{
                  return(<SelectItem key={index} value={valueKey} >{valueKey}</SelectItem>)
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-medium">Diagramm:</p>
        <div>
          <Select onValueChange={(e)=>onChange(e,'type')} defaultValue="pie">
            <SelectTrigger className="w-[180px] border-def">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-sec border-def rounded-md max-h-[200px] overflow-y-scroll ">
                <SelectLabel className="p-4">Diagramme</SelectLabel>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="pie">Kreis</SelectItem>
                <SelectItem value="radar">Netz</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="xl:hidden flex">
        <ReactChart type={diagramType} width={`${window.innerWidth/2}px`} height={`${window.innerWidth/2}px`} data={GraphData} options={options} />
      </div>
      <div className="hidden xl:flex">
        <ReactChart type={diagramType} data={GraphData} options={{...options,plugins:{legend:{position:(diagramType=='bar')?"top":"right"}}}}/>
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

