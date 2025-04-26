"use client"

import { useEffect, useState } from "react"

import ActivitySummaryContainer from "@/components/activity/ActivitySummaryContainer"
import { ActivityDataStateType } from "@/lib/types"
import { getAllActivityData } from "@/lib/actions/activity.actions"
import { MS_IN_MINUTE } from "@/lib/constants/activity"
import ActivityChartContainer from "@/components/activity/ActivityChartContainer"

const ActivityDashboard = () => {

  const [allActivityData, setAllActivityData] = useState<ActivityDataStateType>({
    keyPresses: [],
    leftClicks: [],
    rightClicks: [],
    mouseMovements: [],
  })

  const POLLING_FREQUENCY = MS_IN_MINUTE*10

  useEffect(() => {
    const fetchAllActivityData = async () => {
      try {
        const allActivityDataResult = await getAllActivityData()
        setAllActivityData(allActivityDataResult)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllActivityData()

    // Set up polling
    const intervalId = setInterval(fetchAllActivityData, POLLING_FREQUENCY)

    return () => clearInterval(intervalId) // Clean up
  }, [POLLING_FREQUENCY])

  return (
    <div className="flex flex-col gap-4">
      <h1>pc activity</h1>
      <ActivitySummaryContainer activityData={allActivityData} />
      <ActivityChartContainer activityData={allActivityData} />
    </div>
  )
}

export default ActivityDashboard
