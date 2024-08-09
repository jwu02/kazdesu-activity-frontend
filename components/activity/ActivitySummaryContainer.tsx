import { ActivitySummaryContainerProps, ActivitySummaryProps } from "@/lib/componentProps"
import { formatCount, formatMeasurement } from '@/lib/utils'
import { ActivityTypeKey } from '@/lib/types'
import { activityTypeMapping } from '@/lib/constants'

const ActivitySummaryContainer: React.FC<ActivitySummaryContainerProps> = ({ activityData }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 place-items-end">
      {
        Object.keys(activityData).map(activityTypeKey => (
          <div key={activityTypeKey} className="pr-[30%]">
            <div className="flex flex-col flex-nowrap items-end p-2">
              <ActivitySummary 
                activityType={activityTypeKey as ActivityTypeKey}
                total={
                  activityTypeKey === 'mouseMovements'
                    ? activityData[activityTypeKey].reduce((t, obj) => t + obj.amount, 0)
                    : activityData[activityTypeKey].reduce((t, obj) => t + obj.count, 0)
                }
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ActivitySummaryContainer

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ activityType, total }) => {
  const activityLabel = activityTypeMapping[activityType].summaryLabel

  return (
    <>
      <span className="text-nowrap text-sm opacity-75">
        {activityLabel}
      </span>

      <span className="flex items-center">
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
    </>
  )
}