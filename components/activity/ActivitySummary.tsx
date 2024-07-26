import React from 'react'

import { ActivitySummaryProps, DataSummaryContainerProps } from "@/componentProps"
import { formatCount, formatMeasurement } from '@/utils'

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ keyPresses, leftClicks, rightClicks, mouseMovements }) => {
  return (
    <div className="flex justify-around">
      <DataSummaryContainer 
        label="key presses"
        total={keyPresses.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="left clicks"
        total={leftClicks.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="right clicks"
        total={rightClicks.reduce((t, obj) => t = t + obj.count, 0 )}
      />

      <DataSummaryContainer 
        label="walked mouse for"
        total={mouseMovements.reduce((t, obj) => t = t + Math.round(obj.amount), 0 )}
      />
    </div>
  )
}

export default ActivitySummary

const DataSummaryContainer: React.FC<DataSummaryContainerProps> = ({ label, total }) => {
  return (
    <div className="flex flex-col items-center py-3 px-5">
      <span className="text-nowrap text-sm">{label}</span>
      <span>
        <span className="text-2xl font-black">
          {label=="walked mouse for" ? 
            <>
              {formatMeasurement(total)}
              <span className="text-xl">m</span>
            </>
            :
            formatCount(total)
          }
        </span>
      </span>
    </div>
  )
}