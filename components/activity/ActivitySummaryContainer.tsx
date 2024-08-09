"use client"

import { ActivitySummaryContainerProps, ActivitySummaryProps } from "@/lib/componentProps"
import { formatCount, formatMeasurement } from '@/lib/utils'
import { ActivityTypeKey } from '@/lib/types'
import { activityTypeMapping } from '@/lib/constants'

import { animate } from 'framer-motion'
import { useEffect, useRef } from "react"

const ActivitySummaryContainer = ({ activityData }: ActivitySummaryContainerProps) => {
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
  }, [total])

  return (
    <>
      <span className="text-nowrap text-sm opacity-75">
        {activityLabel}
      </span>

      <span>
        <span className="text-3xl font-black" ref={ref}>0</span>
        {activityType==="mouseMovements" && 
          <span className="text-2xl">m</span>
        }
      </span>
    </>
  )
}