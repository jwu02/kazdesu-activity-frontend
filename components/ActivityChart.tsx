import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import * as d3 from "d3"
import React from "react";

const filterLastXHours = (x, data) => {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - x)
  return data.filter(entry => new Date(entry.createdAt) >= oneDayAgo)
};

const filterLast24Hours = (data) => {
  return filterLastXHours(24 * 60 * 60 * 1000, data)
}

const monitoredDataTypes = ["keyPresses", "leftClicks", "rightClicks", "mouseMovements"]

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

const ActivityChart = ({ keyPresses, leftClicks, rightClicks, mouseMovements }) => {
  // get data within last 24 hours
  const filteredKeypresses = filterLast24Hours(keyPresses)
  const filteredLeftClicks = filterLast24Hours(leftClicks)
  const filteredRightClicks = filterLast24Hours(rightClicks)
  const filteredMouseMovements = filterLast24Hours(mouseMovements)

  // Combine the data into a single array, adding a type property for differentiation
  const combinedData = [
    ...filteredKeypresses.map(data => ({ ...data, type: 'Key Presses' })),
    ...filteredLeftClicks.map(data => ({ ...data, type: 'Left Clicks' })),
    ...filteredRightClicks.map(data => ({ ...data, type: 'Right Clicks' })),
    ...filteredMouseMovements.map(data => ({ ...data, type: "Mouse Movements" }))
  ]

  // choose intervals to collate data
  const numPoints = 24*1*3

  // Calculate interval duration in milliseconds (24 hours divided by 72 intervals)
  const intervalDuration = 24 * 60 * 60 * 1000 / numPoints

  // Create an array of timestamps for the last 24 hours, split into 72 intervals
  const now = new Date()
  const intervals = Array.from({ length: 72 }, (_, index) => now.getTime() - index * intervalDuration)

  // Use reduce to initialize the object with each interval timestamp mapped to 0
  const intervalMapping = intervals.reduce((acc, timestamp) => {
    acc[timestamp] = { 
      'Key Presses': 0, 
      'Left Clicks': 0, 
      'Right Clicks': 0,
      'Mouse Movements': 0
    }
    return acc
  }, {})

  combinedData.forEach((data) => {
    intervals.forEach((timeInterval: number) => {
      if (data.createdAt<timeInterval && data.createdAt>timeInterval-intervalDuration) {
        intervalMapping[timeInterval][data.type] += data.count !== undefined ? data.count : Math.round(data.amount)
      }
    })
  })

  const transformedData = Object.entries(intervalMapping).map(([timestamp, values]) => {
    return { name: Number(timestamp), ...values }
  })

  const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000

  const domainToday = d3.scaleTime().domain([new Date(twentyFourHoursAgo), new Date(now)])
  const timeFormatter = (tick) => {return d3.timeFormat('%H:%M')(new Date(tick))}
  const ticks = domainToday.ticks(d3.timeHour.every(2)).map(tick => tick.getTime())

  return (
    <div className="w-full h-[300px] group">
      <ResponsiveContainer>
        <AreaChart width={730} height={250} data={transformedData}>
          <defs>
            {/* remember map and forEach are not the same, use map for dynamically rendering elements */}
            {monitoredDataTypes.map((obj, i) => (
              <linearGradient key={i} id={dataKeys[obj].linearGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dataKeys[obj].colour} stopOpacity={0.8} />
                <stop offset="95%" stopColor={dataKeys[obj].colour} stopOpacity={0} />
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
          
          {monitoredDataTypes.map((obj, i) => (
            <Area 
              key={i}
              type="monotone" 
              dataKey={dataKeys[obj].dataKey} 
              stroke={dataKeys[obj].colour} 
              fillOpacity={1} 
              fill={`url(#${dataKeys[obj].linearGradientId})`} 
              activeDot={false} 
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityChart

const CustomTooltip = ({ active, payload, label }) => {
  const dateLabel = new Date(label)

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip border p-3 py-2 bg-black">
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
              <div className="w-3 h-3" style={{backgroundColor: pld.color}}></div>
              <div>{pld.dataKey}</div>
              <div>{pld.value}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  return null
}