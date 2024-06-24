"use client";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import * as s from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {Progress } from "@/components/ui/progress"
import * as p from "@/components/ui/popover";
import * as c from "@/components/ui/command"
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import * as t from "@/components/ui/tooltip"

// Register ChartJS components using ChartJS.register
ChartJS.register(...registerables);

interface LineProps {
  data: {key:string,value:string}[][];
  type: "bar"|"pie"|"radar",
  forKey:"sum"|"ret"|"risk"
}

export const MarketChart = ({type,data,forKey}:LineProps) => {
  const [diagramValueX,setDiagramValueX] = useState<string>("Eine Kategorie auswählen");
  const {theme} = useTheme()
  const diagramValueY = forKey=="sum"?"summe":forKey=="ret"?"rendite":"risiko";
  const [diagramType,setDiagramType] = useState<"bar"|"pie"|"radar">(type);
  const [chartData, setChartData] = useState<any[][]>();
  const [open, setOpen] = React.useState(false)

  const onChange=(e:string,direction:"x"|"y"|"type") => {
    if(direction=="x"){
      setDiagramValueX(e)
    }
    else if(direction=="y"){
    }
    else{
      setDiagramType(e as "bar"|"pie"|"radar")
    }
  }
  useEffect(() => {
    let tempCharData:any[][] = []

    //! ONLY WORKS FOR BAR AND PIE Graphs and SUM
    data.forEach((item) => {
      //check if SUM,RETURN or RISK is present in investment
      if(isKeyInList(diagramValueY,item)){
        // gets the value of the Category
        let x = getKeyFromList(diagramValueX,item)
        // if the category is not present in the investment add as Sonstige...
        if (!x) x="Sonstige..."
        // gets the value of SUM,RETURN or RISK
        const y = Number.parseInt(getKeyFromList(diagramValueY,item))
          // gets the index if category is already present in the list
        const index = getIndexFromKey(x,tempCharData)
        if(index >=0){
          // Overrides current entry for Category
          switch (diagramValueY) {
            case "summe":
                tempCharData[index] = [x,tempCharData[index][1]+y]
              break;
            case "rendite":
                tempCharData[index] = [x,tempCharData[index][1]+y,tempCharData[index][2]+1]
              break;
            case "risiko":
              tempCharData[index] = [x,tempCharData[index][1]+1]
              break;
          }
        }
        else{
          // Adds the Category and value to the templist
          switch (diagramValueY) {
            case "summe":
              tempCharData.push([x,y])
              break;
            case "rendite":
              tempCharData.push([x,y,1])
              break;
            case "risiko":
              tempCharData.push([x,1])
              break;
          }
        }
      } 
    });
    if(diagramValueY=="rendite"){
      tempCharData=tempCharData.map(data=>{return [data[0],(data[1]/data[2])]})
    }
    setChartData(tempCharData)
  }, [data,diagramValueX,diagramValueY]);

  if (!chartData||!theme) {
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
        borderColor: theme=="light"?createPatternArray(chartData.length,"#00aaff","#002bff"):createPatternArray(chartData.length,"#ff6a00","#ffea00"),
        backgroundColor: theme=="light"?createPatternArray(chartData.length,"#00aaff80","#0011ff80"):createPatternArray(chartData.length,"#ff6a0080","#ffea0080"),
        borderWidth: 1,
      },
    ],
  };
  const listKeys:string[] = []
  data.forEach(item => {
    item.forEach(keys => {
      if(!listKeys.includes(keys.key)&&keys.key.toLowerCase()!="summe"){
        listKeys.push(keys.key)
      }
    })
  })
  listKeys.sort((a,b)=>a.localeCompare(b))

  return(
    <t.Tooltip>
      <t.TooltipTrigger>
        <div className="xl:w-full max-w-[70vw] flex flex-col justify-center items-start gap-y-4">
          <p className={"text-big font-medium"}>{"Deine "}{forKey=="sum"?"Investitionssummen":forKey=="ret"?"Durchschnitsrendite":"Risikoklassenverteilung"}</p>
          <div className="flex xl:flex-row flex-col gap-2">
            <div>
              <p.Popover open={open} onOpenChange={setOpen}>
                <p.PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {diagramValueX}
                  </Button>
                </p.PopoverTrigger>
                <p.PopoverContent>
                  <c.Command>
                    <c.CommandInput placeholder="Nach Kategorie suchen" />
                    <c.CommandList>
                      <c.CommandEmpty>Noch keine Investmens erstellt</c.CommandEmpty>
                      <c.CommandGroup>
                        {listKeys.map((valueKey,index)=>{
                          return(<c.CommandItem key={index} value={valueKey} onSelect={(e)=>{onChange(e,'x');setOpen(false)}}><Check className={cn("mr-2 h-4 w-4",diagramValueX==valueKey?"opacity-100":"opacity-0")} />{valueKey}</c.CommandItem>)
                        })}
                      </c.CommandGroup>
                    </c.CommandList>
                  </c.Command>

                </p.PopoverContent>
              </p.Popover>
            </div>
            <p className="text-medium">Diagramm:</p>
            <div>
              <s.Select onValueChange={(e)=>onChange(e,'type')} defaultValue="pie">
                <s.SelectTrigger>
                  <s.SelectValue/>
                </s.SelectTrigger>
                <s.SelectContent>
                  <s.SelectGroup>
                    <s.SelectItem value="bar">Säulen</s.SelectItem>
                    <s.SelectItem value="pie">Kreis</s.SelectItem>
                  </s.SelectGroup>
                </s.SelectContent>
              </s.Select>
            </div>
          </div>
          <div className="xl:hidden flex">
            {diagramValueX!="Eine Kategorie auswählen"&&<ReactChart type={diagramType} width={`${window.innerWidth/2}px`} height={`${window.innerHeight/2}px/`} data={GraphData} options={{...options,indexAxis:'y' as const}} />}
          </div>
          <div className="hidden xl:flex">
            {diagramValueX!="Eine Kategorie auswählen"&&<ReactChart type={diagramType} width={`${window.innerWidth/5}px`} height={`${window.innerHeight/5}px/`} data={GraphData} options={{...options,plugins:{legend:{position:(diagramType=='bar')?"bottom":"right"}}}}/>}
          </div>
        </div>
      </t.TooltipTrigger>
      <t.TooltipContent>
      </t.TooltipContent>
    </t.Tooltip>
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

export const createPatternArray = (n:number,a:string,b:string) => {
  const res:string[] = []
  for(let i=0;i<n;i++){
    res.push(i%2=== 0? a: b);
  }
  return res
}

export const isKeyInList = (key: string, list: {[key:string]:any}[]): boolean => {
  return list.some((item) => (item.key as string).toLowerCase().includes(key.toLowerCase()));
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
  return list.find((item) => (item.key as string).toLowerCase().includes(key.toLowerCase()))?.value;
}

