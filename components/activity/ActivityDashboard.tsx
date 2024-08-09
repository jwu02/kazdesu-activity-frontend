"use client"

import { useEffect, useState } from "react"

import AllActivitySummary from "@/components/activity/AllActivitySummary"
import { ActivityDataStateType } from "@/lib/types"
import { getAllActivityData } from "@/lib/actions/activity.actions"
import { MS_IN_MINUTE } from "@/lib/constants"
import ChartContainer from "./ChartContainer"

const ActivityDashboard = () => {

  const [allActivityData, setAllActivityData] = useState<ActivityDataStateType>({
    keyPresses: [],
    leftClicks: [],
    rightClicks: [],
    mouseMovements: [],
  })

  const fetchAllActivityData = async () => {
    try {
      const allActivityDataResult = await getAllActivityData()
      setAllActivityData(allActivityDataResult)
      console.log(allActivityDataResult)
    } catch (err) {
      console.log(err)
    }
  }

  const POLLING_FREQUENCY = MS_IN_MINUTE*10

  useEffect(() => {
    fetchAllActivityData()

    // Set up polling
    const intervalId = setInterval(fetchAllActivityData, POLLING_FREQUENCY)

    return () => clearInterval(intervalId) // Clean up
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1>activity</h1>
      <AllActivitySummary activityData={allActivityData} />
      <ChartContainer activityData={allActivityData} />
    </div>
  )
}

export default ActivityDashboard
