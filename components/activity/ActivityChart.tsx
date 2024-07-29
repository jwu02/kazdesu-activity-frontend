import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import React, { useState } from "react"
import { filterActivityData, getTimeTicks, timeTickDateFormatter, timeTickHourFormatter } from "@/utils"
import { ActivityChartProps } from "@/componentProps"
import { activityTypeMapping, MS_IN_DAY } from "@/constants"
import CustomTooltip from "@/components/activity/CustomTooltip"
import { ActivityTypeKey, IntervalMapping } from "@/types"

const ActivityChart: React.FC<ActivityChartProps> = ({ activityData }) => {
  // Filter for data within the last day / 24 hours by default
  const [filterWindow, setFilterWindow] = useState<number>(MS_IN_DAY)

  // Use filtering and combining activity data
  const combinedData = Object.entries(activityData).flatMap(([key, data]) => {
    const filteredData = filterActivityData(filterWindow, data)

    return filteredData.map(item => ({ 
      ...item, 
      type: activityTypeMapping[key as ActivityTypeKey].dataKey 
    }))
  })

  const numPoints = 24*1*3 // How many intervals to group data at

  // Calculate interval duration in milliseconds (e.g. 24 hours divided by 72 numPoints / intervals)
  const intervalDuration = filterWindow / numPoints

  // Create an array of timestamps for the last 24 hours, split into 72 intervals
  const now = new Date().getTime()
  const intervals = Array.from({ length: numPoints }, (_, index) => now - index*intervalDuration)

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
    const createdAtTimestamp = data.createdAt.getTime()
  
    intervals.forEach((timeInterval: number) => {
      if (createdAtTimestamp < timeInterval && createdAtTimestamp > timeInterval - intervalDuration) {
        intervalMapping[timeInterval] = intervalMapping[timeInterval] || {
          'Key Presses': 0,
          'Left Clicks': 0,
          'Right Clicks': 0,
          'Mouse Movements': 0
        }
        
        intervalMapping[timeInterval][data.type] += 'count' in data ? data.count : Math.round(data.amount || 0)
      }
    })
  })

  const chartData = Object.entries(intervalMapping).map(([timestamp, values]) => {
    return { name: Number(timestamp), ...values }
  })

  return (
    <div className="w-full h-[300px] group">
      <ResponsiveContainer>
        <AreaChart width={730} height={250} data={chartData}>
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
            ticks={getTimeTicks(now, filterWindow)}
            tick={{ fill: 'white'}}
            tickFormatter={filterWindow > MS_IN_DAY ? timeTickDateFormatter : timeTickHourFormatter}
          />
          <YAxis className="hidden group-hover:block" axisLine={false} tick={{ fill: 'white'}} tickCount={8} />
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
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          
          {Object.entries(activityTypeMapping).map(([key, item]) => (
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
