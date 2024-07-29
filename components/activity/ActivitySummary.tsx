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
            label={activityTypeMapping[key as ActivityTypeKey].summaryLabel}
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

const DataSummaryContainer: React.FC<DataSummaryContainerProps> = ({ activityType, label, total }) => {
  return (
    <div className="flex flex-col items-center py-3 px-5">
      <span className="text-nowrap text-sm">{label}</span>
      <span>
        <span className="text-2xl font-black">
          {activityType=="mouseMovements" ? 
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