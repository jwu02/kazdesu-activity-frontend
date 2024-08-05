import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { PcActivity } from "@/lib/types"
import { MS_IN_DAY } from "@/lib/constants"

import * as d3 from "d3"

export const filterActivityData = (x: number, data: PcActivity[]): PcActivity[] => {
  // x should be given in milliseconds
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - x)
  return data.filter(entry => new Date(entry.createdAt) >= oneDayAgo)
}

export const formatCount = (count: number) => {
  if (count >= 10000) {
    return `${Math.floor(count/1000)}k`
  }
  return String(count)
}

export const formatMeasurement = (amount: number) => {
  if (amount >= 1000) {
    amount = amount/1000
  } else {
    return amount
  }

  if (amount >= 10) {
    amount = Math.floor(amount)
  } else {
    amount = Math.floor(amount*10)/10
  }

  return String(amount)+'k'
}

export const timeTickHourFormatter = (tick: Date): string => {
  return d3.timeFormat('%H:%M')(tick)
}

export const timeTickDateFormatter = (tick: Date): string => {
  return d3.timeFormat('%m/%d')(tick)
}

export const getTimeTicks = (now: number, filterWindow: number) => {
  // This function generates an array of time ticks within a specified time window.
  const startTime = new Date(now - filterWindow)
  const endTime = now

  const domain = d3.scaleTime().domain([startTime, endTime])
  // If filterWindow displaying data from past day/24 hours, display ticks for every 3 hours, else every 1 day
  let tickInterval

  switch (filterWindow) {
    case MS_IN_DAY:
      tickInterval = d3.timeHour.every(3)
      break
    case MS_IN_DAY*7:
      tickInterval = d3.timeDay.every(1)
      break
    case MS_IN_DAY*30:
      tickInterval = d3.timeDay.every(3)
      break
    default:
      throw new Error("Invalid timeframe supplied.")
  }


  // Create a time scale and generate ticks at regular intervals (every 2 hours by default) within the given time range
  const ticks = domain.ticks(tickInterval!).map(tick => tick.getTime())

  return ticks
}