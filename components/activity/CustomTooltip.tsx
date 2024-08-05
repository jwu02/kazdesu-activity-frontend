import React from 'react'

import { CustomTooltipProps } from "@/componentProps";

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active = false, payload = [], label = '' }) => {
  const dateLabel = new Date(label)

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip border border-border p-3 py-2 bg-background">
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

export default CustomTooltip