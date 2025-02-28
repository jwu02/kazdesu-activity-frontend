"use client"

import { ActivitySummaryContainerProps, ActivitySummaryProps } from "@/lib/componentProps"
import { formatCount, formatMeasurement } from '@/lib/utils'
import { ActivityTypeKey } from '@/lib/types'
import { activityTypeMapping } from '@/lib/constants'

import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from "react"

const ActivitySummaryContainer = ({ activityData }: ActivitySummaryContainerProps) => {
  return (
    <div className="flex flex-wrap justify-around gap-3">
      {
        Object.keys(activityData).map(activityTypeKey => (
          <ActivitySummary 
            key={activityTypeKey}
            activityType={activityTypeKey as ActivityTypeKey}
            total={
              activityData[activityTypeKey].reduce((t, obj) => t + obj.count, 0)
            }
          />
        ))
      }
    </div>
  )
}

export default ActivitySummaryContainer

const ActivitySummary = ({ activityType, total }: ActivitySummaryProps) => {
  const activityLabel = activityTypeMapping[activityType].summaryLabel
  const totalFormatter = activityType==="mouseMovements" ? formatMeasurement : formatCount
  
  const [isHovered, setIsHovered] = useState(false)
  const Icon = isHovered ? activityTypeMapping[activityType].iconHover : activityTypeMapping[activityType].icon
  const typeColour = activityTypeMapping[activityType].colour

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
    <div className="flex gap-2 p-4 rounded-lg group"
      style={{
        color: isHovered ? typeColour : ""
      }}
      onMouseEnter={()=>setIsHovered(true)}
      onMouseLeave={()=>setIsHovered(false)}
    >
      <div className="opacity-75 group-hover:opacity-100"><Icon size={24} /></div>

      <div className="flex flex-col flex-nowrap items-end gap-2 ml-auto">
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
    </div>
  )
}