import { ActivitySummaryProps, ActivityTypeSummaryContainerProps } from "@/lib/componentProps"
import { formatCount, formatMeasurement } from '@/lib/utils'
import { ActivityTypeKey } from '@/lib/types'
import { activityTypeMapping } from '@/lib/constants'

const AllActivitySummary: React.FC<ActivitySummaryProps> = ({ activityData }) => {
  return (
    <div className="flex justify-around">
      {
        Object.keys(activityData).map(activityTypeKey => (
          <ActivityTypeContainer 
            key={activityTypeKey}
            activityType={activityTypeKey as ActivityTypeKey}
            total={
              activityTypeKey === 'mouseMovements'
                ? activityData[activityTypeKey].reduce((t, obj) => t + obj.amount, 0)
                : activityData[activityTypeKey].reduce((t, obj) => t + obj.count, 0)
            }
          />
        ))
      }
    </div>
  )
}

export default AllActivitySummary

const ActivityTypeContainer: React.FC<ActivityTypeSummaryContainerProps> = ({ activityType, total }) => {
  const activityLabel = activityTypeMapping[activityType].summaryLabel

  return (
    <div className="flex flex-nowrap items-center gap-2 relative">
      <div className="flex flex-col items-end p-2">
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
      </div>
    </div>
  )
}