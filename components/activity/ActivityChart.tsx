import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts"
import { getTimeTicks, timeTickDateFormatter, timeTickHourFormatter } from "@/lib/utils"
import { activityTypeMapping, MS_IN_DAY } from "@/lib/constants/activity"
import { FaSquare } from 'react-icons/fa6'
import React, { useState } from "react"

export interface ActivityChartProps {
  chartData: Array<{
    name: number;
    [key: string]: number;
  }>;
  filterWindow: number;
  now: number;
}

const ActivityChart = ({ chartData, filterWindow, now }: ActivityChartProps) => {
  const timeTicks = getTimeTicks(now, filterWindow)
  const timeTickFormatter = filterWindow > MS_IN_DAY ? timeTickDateFormatter : timeTickHourFormatter
  const tickColor = 'var(--foreground)'

  const [hiddenSeries, setHiddenSeries] = useState<Array<string>>([])

  return (
    <ResponsiveContainer className="group" width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
        <defs>
          {/* remember map and forEach are not the same, use map for dynamically rendering elements */}
          {Object.entries(activityTypeMapping).map(([key, item]) => (
            <linearGradient key={key} id={item.linearGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={item.colour} stopOpacity={0.8} />
              <stop offset="95%" stopColor={item.colour} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        
        {/* fixed issue relating with plot offset when using scale='time' */}
        {/* https://github.com/recharts/recharts/issues/154 */}
        {/* also requires a domain for the data to be plotted properly */}
        {/* https://github.com/recharts/recharts/issues/1080 */}
        <XAxis
          // className="hidden group-hover:block"
          dataKey="name"
          axisLine={false}
          domain={['auto', 'auto']}
          type='number'
          scale='time'
          ticks={timeTicks}
          tick={{ fill: tickColor}}
          stroke=""
          tickFormatter={timeTickFormatter}
        />
        <YAxis 
          className="hidden group-hover:block" 
          axisLine={false} 
          tick={{ fill: tickColor}} 
          stroke=""
          tickCount={8} 
        />
        {/* adding a yaxis to the right to fix alignment */}
        {/* https://www.geeksforgeeks.org/create-a-biaxial-line-chart-using-recharts-in-reactjs/ */}
        <YAxis yAxisId="right-axis" orientation="right" />

        <CartesianGrid 
          className="hidden group-hover:block" 
          stroke="grey" 
          strokeDasharray="3 3" 
          vertical={false} 
        />
        <Tooltip content={<CustomTooltip />} accessibilityLayer={false} isAnimationActive={false} />
        <Legend content={<CustomLegend hiddenSeries={hiddenSeries} setHiddenSeries={setHiddenSeries} />}/>
        
        {Object.entries(activityTypeMapping).map(([key, item]) => (
          <Area 
            key={key}
            hide={hiddenSeries.includes(item.dataKey)}
            type="linear" 
            dataKey={item.dataKey} 
            stroke={item.colour} 
            fillOpacity={1} 
            fill={`url(#${item.linearGradientId})`} 
            activeDot={false} 
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ActivityChart

export interface CustomTooltipProps<ValueType extends string | number = number, NameType extends string | number = string> extends TooltipProps<ValueType, NameType> {
  active?: boolean;
  payload?: {
    name?: NameType;
    value?: ValueType;
    dataKey?: string;
    color?: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length || !label) return null;

  const dateLabel = new Date(label)

  return (
    <div className="custom-tooltip border border-foreground p-3 py-2 bg-background">
      <p className="label">
        {dateLabel.toLocaleTimeString('en-GB', {
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        })}
      </p>
      
      <div className="tooltip-legend">
        {payload.map((pld) => (
          // adding key to react fragment so nextjs doesn't throw a tantrum
          // https://stackoverflow.com/questions/73359286/can-you-add-properties-to-the-empty-element-in-react
          <React.Fragment key={pld.dataKey}>
            <FaSquare color={pld.color} />
            <div>{pld.dataKey}</div>
            <div>{pld.value}{pld.dataKey==="Mouse Movements" && "m"}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

interface CustomLegendProps {
  payload?: {
    dataKey: string;
    color: string;
  }[];
  hiddenSeries: string[];
  setHiddenSeries: React.Dispatch<React.SetStateAction<string[]>>;
}

const CustomLegend = ({ payload, hiddenSeries, setHiddenSeries }: CustomLegendProps) => {

  const handleLegendClick = (dataKey: string) => {
    if (hiddenSeries.includes(dataKey)) {
      setHiddenSeries(hiddenSeries.filter(el => el !== dataKey))
    } else {
      // ensure at least one activity type plot active on chart
      if (hiddenSeries.length < Object.keys(activityTypeMapping).length-1) {
        setHiddenSeries(prev => [...prev, dataKey])
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {payload?.map((pld) => (
        <div 
          key={pld.dataKey} 
          className={`flex flex-nowrap items-center gap-1 hover:cursor-pointer 
            ${hiddenSeries.includes(pld.dataKey) && 'opacity-20'}`} 
          onClick={()=>handleLegendClick(pld.dataKey)}
        >
          <FaSquare color={pld.color} />
          <span className="opacity-75 hover:opacity-100">{pld.dataKey}</span>
        </div>
      ))}
    </div>
  )
}