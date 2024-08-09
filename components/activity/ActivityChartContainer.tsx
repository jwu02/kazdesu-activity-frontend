"use client"

import React, { useState } from 'react'
import TimeframeToggleGroup from '@/components/activity/TimeframeToggleGroup'
import { activityTypeMapping, MS_IN_DAY } from '@/lib/constants'
import { filterActivityData } from '@/lib/utils'
import { ActivityTypeKey, IntervalMapping } from '@/lib/types'
import ActivityChart from '@/components/activity/ActivityChart'
import { ActivityChartContainerProps } from '@/lib/componentProps'

const ActivityChartContainer: React.FC<ActivityChartContainerProps> = ({ activityData }) => {
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
    const createdAtTimestamp = new Date(data.createdAt).getTime()
  
    intervals.forEach((timeInterval: number) => {
      if (createdAtTimestamp < timeInterval && createdAtTimestamp > timeInterval - intervalDuration) {
        intervalMapping[timeInterval] = intervalMapping[timeInterval] || {
          'Key Presses': 0,
          'Left Clicks': 0,
          'Right Clicks': 0,
          'Mouse Movements': 0
        }
        
        intervalMapping[timeInterval][data.type] += 'count' in data ? data.count : Math.round(data.amount)
      }
    })
  })

  const chartData = Object.entries(intervalMapping).map(([timestamp, values]) => {
    return { name: Number(timestamp), ...values }
  })

  return (
    <div className="flex flex-col items-center">
      <div className="sm:ml-auto sm:mr-[7%]">
        <TimeframeToggleGroup setFilterWindow={setFilterWindow} />
      </div>
      <div className="w-full h-[300px]">
        <ActivityChart chartData={chartData} filterWindow={filterWindow} now={now} />
      </div>
    </div>
  )
}

export default ActivityChartContainer