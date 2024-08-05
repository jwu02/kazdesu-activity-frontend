"use client"

import { useEffect, useState } from "react";

import ActivityChart from "@/components/activity/ActivityChart";
import ActivitySummary from "@/components/activity/ActivitySummary";
import { ActivityDataStateType } from "@/types";
import { getActivityData } from "@/lib/actions/activity.actions";
import { MS_IN_MINUTE } from "@/constants";

const ActivityDashboard = () => {

  const [activityData, setActivityData] = useState<ActivityDataStateType>({
    keyPresses: [],
    leftClicks: [],
    rightClicks: [],
    mouseMovements: [],
  })

  const fetchActivityData = async () => {
    try {
      // https://stackoverflow.com/questions/13343340/calling-an-asynchronous-function-within-a-for-loop-in-javascript
      for (const at of Object.keys(activityData)) {
        const data = await getActivityData(at)
        setActivityData(prevState => ({
          ...prevState,
          [at]: data,
        }))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const POLLING_FREQUENCY = MS_IN_MINUTE*10

  useEffect(() => {
    fetchActivityData()

    // Set up polling
    const intervalId = setInterval(fetchActivityData, POLLING_FREQUENCY)

    return () => clearInterval(intervalId) // Clean up
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1>activity</h1>
      <ActivitySummary activityData={activityData} />
      <ActivityChart activityData={activityData} />
    </div>
  )
}

export default ActivityDashboard
