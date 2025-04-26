"use client"

import { formatCount, formatMeasurement } from '@/lib/utils'
import { ActivityDataStateType, ActivityTypeKey } from '@/lib/types'
import { activityTypeMapping } from '@/lib/constants/activity'

import { animate } from 'framer-motion'
import { useEffect, useRef } from "react"

export interface ActivitySummaryContainerProps {
  activityData: ActivityDataStateType;
}

const ActivitySummaryContainer = ({ activityData }: ActivitySummaryContainerProps) => {
  return (
    <div className="flex flex-wrap justify-around gap-3">
      {
        Object.keys(activityData).map(activityTypeKey => (
          <ActivitySummary 
            key={activityTypeKey}
            activityType={activityTypeKey as ActivityTypeKey}
            total={
              activityData[activityTypeKey as ActivityTypeKey].reduce((t: number, obj: { count: number }) => t + obj.count, 0)
            }
          />
        ))
      }
    </div>
  )
}

export default ActivitySummaryContainer

export interface ActivitySummaryProps {
  activityType: ActivityTypeKey;
  total: number;
}


const ActivitySummary = ({ activityType, total }: ActivitySummaryProps) => {
  const activityLabel = activityTypeMapping[activityType].summaryLabel
  const totalFormatter = activityType==="mouseMovements" ? formatMeasurement : formatCount

  const ref = useRef<HTMLSpanElement>(null)

  useEffect(()=>{
    const element = ref.current;
    if (!element) return

    element.textContent = String(totalFormatter(total))

    const controls = animate(0, total, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = String(totalFormatter(value))
      }
    })

    return () => controls.stop()
  }, [total, totalFormatter])

  return (
    <div className="flex flex-col flex-nowrap items-end ml-auto gap-2 p-4 rounded-lg group">
      <span className="text-nowrap font-black">
        <span className="text-3xl" ref={ref}>0</span>
        {activityType==="mouseMovements" && 
          <span className="text-2xl">m</span>
        }
      </span>
      <span className="text-nowrap text-sm opacity-75 group-hover:opacity-100">
        {activityLabel}
      </span>
    </div>
  )
}