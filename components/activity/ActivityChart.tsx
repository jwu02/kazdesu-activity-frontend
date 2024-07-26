import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import * as d3 from "d3"
import React from "react";
import { filterLastXMs } from "@/utils";
import { ActivityChartProps } from "@/componentProps";
import { MS_IN_DAY } from "@/constants/durations";
import CustomTooltip from "./CustomTooltip";

const dataKeys = {
  "keyPresses": {
    dataKey: "Key Presses",
    linearGradientId: "colorUv",
    colour: "#8884d8"
  }, 
  "leftClicks": {
    dataKey: "Left Clicks",
    linearGradientId: "colorPv",
    colour: "#82ca9d"
  }, 
  "rightClicks": {
    dataKey: "Right Clicks",
    linearGradientId: "colorRc",
    colour: "#ffc658"
  }, 
  "mouseMovements": {
    dataKey: "Mouse Movements",
    linearGradientId: "colorMm",
    colour: "#83a6ed"
  }
}

const ActivityChart: React.FC<ActivityChartProps> = ({ keyPresses, leftClicks, rightClicks, mouseMovements }) => {
  const filterWindow = MS_IN_DAY // filter data within last 24 hours

  const filteredKeypresses = filterLastXMs(filterWindow, keyPresses)
  const filteredLeftClicks = filterLastXMs(filterWindow, leftClicks)
  const filteredRightClicks = filterLastXMs(filterWindow, rightClicks)
  const filteredMouseMovements = filterLastXMs(filterWindow, mouseMovements)

  // Combine the data into a single array, adding a type property for differentiation
  const combinedData = [
    ...filteredKeypresses.map(data => ({ ...data, type: 'Key Presses' })),
    ...filteredLeftClicks.map(data => ({ ...data, type: 'Left Clicks' })),
    ...filteredRightClicks.map(data => ({ ...data, type: 'Right Clicks' })),
    ...filteredMouseMovements.map(data => ({ ...data, type: 'Mouse Movements' }))
  ]

  const numPoints = 24*1*3 // How many intervals to group data at

  // Calculate interval duration in milliseconds (24 hours divided by 72 intervals)
  const intervalDuration = 24 * 60 * 60 * 1000 / numPoints

  // Create an array of timestamps for the last 24 hours, split into 72 intervals
  const now = new Date()
  const intervals = Array.from({ length: 72 }, (_, index) => now.getTime() - index * intervalDuration)

  interface IntervalMapping {
    [timestamp: number]: any;
  }

  // Use reduce to initialize the object with each interval timestamp mapped to 0
  const intervalMapping: IntervalMapping = intervals.reduce((acc, timestamp) => {
    acc[timestamp] = { 
      'Key Presses': 0, 
      'Left Clicks': 0, 
      'Right Clicks': 0,
      'Mouse Movements': 0
    }
    return acc
  }, {} as IntervalMapping)

  combinedData.forEach((data) => {
    // Convert createdAt to timestamp
    const createdAtTimestamp = data.createdAt.getTime();
  
    intervals.forEach((timeInterval: number) => {
      if (createdAtTimestamp < timeInterval && createdAtTimestamp > timeInterval - intervalDuration) {
        intervalMapping[timeInterval] = intervalMapping[timeInterval] || {
          'Key Presses': 0,
          'Left Clicks': 0,
          'Right Clicks': 0,
          'Mouse Movements': 0
        }
        
        intervalMapping[timeInterval][data.type] += 'count' in data ? data.count : Math.round(data.amount || 0);
      }
    });
  });

  const transformedData = Object.entries(intervalMapping).map(([timestamp, values]) => {
    return { name: Number(timestamp), ...values }
  })

  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000

  const domainToday = d3.scaleTime().domain([new Date(twentyFourHoursAgo), new Date(now)])
  const timeFormatter = (tick: Date): string => {
    return d3.timeFormat('%H:%M')(tick);
  };
  const ticks = domainToday.ticks(d3.timeHour.every(2)!).map(tick => tick.getTime())

  return (
    <div className="w-full h-[300px] group">
      <ResponsiveContainer>
        <AreaChart width={730} height={250} data={transformedData}>
          <defs>
            {/* remember map and forEach are not the same, use map for dynamically rendering elements */}
            {Object.entries(dataKeys).map(([key, item]) => (
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
            // domain={domainToday}
            domain={['auto', 'auto']}
            type='number'
            scale='time'
            ticks={ticks}
            tick={{ fill: 'white'}}
            tickFormatter={timeFormatter}
          />
          <YAxis className="hidden group-hover:block" axisLine={false} tick={{ fill: 'white'}} />
          {/* adding a yaxis to the right to fix alignment */}
          {/* https://www.geeksforgeeks.org/create-a-biaxial-line-chart-using-recharts-in-reactjs/ */}
          <YAxis yAxisId="right-axis" orientation="right" />
          <CartesianGrid 
            className="hidden group-hover:block" 
            stroke="grey" 
            strokeDasharray="3 3" 
            vertical={false} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            accessibilityLayer={false}
            isAnimationActive={false} 
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          
          {Object.entries(dataKeys).map(([key, item]) => (
            <Area 
              key={key}
              type="monotone" 
              dataKey={item.dataKey} 
              stroke={item.colour} 
              fillOpacity={1} 
              fill={`url(#${item.linearGradientId})`} 
              activeDot={false} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityChart
