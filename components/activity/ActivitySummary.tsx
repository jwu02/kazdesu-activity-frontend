import React from 'react'

import { ActivitySummaryProps, DataSummaryContainerProps } from "@/componentProps"
import { formatCount, formatMeasurement } from '@/utils'
import { ActivityTypeKey } from '@/types'
import { activityTypeMapping } from '@/constants'

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ activityData }) => {
  return (
    <div className="flex justify-around">
      {
        Object.keys(activityData).map(key => (
          <DataSummaryContainer key={key}
            activityType={key as ActivityTypeKey}
            total={
              key === 'mouseMovements'
                ? activityData[key].reduce((t, obj) => t + obj.amount, 0)
                : activityData[key].reduce((t, obj) => t + obj.count, 0)
            }
          />
        ))
      }
    </div>
  )
}

export default ActivitySummary

const DataSummaryContainer: React.FC<DataSummaryContainerProps> = ({ activityType, total }) => {
  const activityLabel = activityTypeMapping[activityType].summaryLabel
  const typeColour = activityTypeMapping[activityType].colour

  return (
    <div className="flex">
      <div className="flex flex-col items-end py-2 px-5">
        <span className="text-nowrap text-sm opacity-75">
          {activityLabel}
        </span>
        <span>
          <span className="text-3xl font-black">
            {activityType==="mouseMovements" ? 
              <>
                {formatMeasurement(total)}
                <span className="text-2xl">m</span>
              </>
              :
              formatCount(total)
            }
          </span>
        </span>
      </div>

      <div className="h-full w-1.5 rounded-r-md" style={{background: typeColour }}></div>
    </div>
  )
}