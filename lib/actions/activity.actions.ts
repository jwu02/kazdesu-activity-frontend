'use server'

import { activityTypeMapping } from "@/constants";
import { ActivityTypeKey } from "@/types";

const ACTIVITY_ENDPOINT = `${process.env.API_ENDPOINT}/activity`

export async function getPCStatus() {
  return true
}

export async function getActivityData(activityType: string) {
  // Type guard to ensure activityType is a valid key
  if (!(activityType in activityTypeMapping)) {
    throw new Error(`Invalid activity type: ${activityType}`)
  }
  
  const response = await fetch(`${ACTIVITY_ENDPOINT}/${activityTypeMapping[activityType as ActivityTypeKey].endPoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await response.json()

  return result.data.map((item) => ({
    id: item.id,
    createdAt: new Date(item.createdAt),
    ...(activityType === 'mouseMovements'
      ? { amount: item.amount }
      : { count: item.count })
  }))
}