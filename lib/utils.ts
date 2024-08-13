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
  return String(Math.floor(count))
}

export const formatMeasurement = (amount: number) => {
  if (amount >= 1000) {
    amount = amount/1000
  } else {
    return Math.floor(amount)
  }

  if (amount >= 100) {
    amount = Math.floor(amount)
  } else {
    amount = round(amount, 1)
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

export const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

export const getFilenameFromPath = (path: string) => {
  // Split the path by '/' and get the last part
  let filename = path.split('/').pop()

  if (filename === undefined) {
    filename = path
  }
    
  // Remove the file extension
  filename = filename.split('.').slice(0, -1).join('.')
  
  return filename
}

export const getDirectoryFromPath = (path: string) => {
  let directory = path.split('/').slice(0, -1).join('/')

  return directory
}

export const extractMarkdownLinks = (markdown: string) => {
  // Regular expression to match substrings inside [[ ... ]]
  const regex = /\[\[(.*?)\]\]/g

  // Match all substrings and return them as an array
  const matches = []
  let match

  while ((match = regex.exec(markdown)) !== null) {
    // match[1] contains the text inside the brackets
    matches.push(match[1])
  }

  return matches
}

export const computeDirectoryDistance = (path1: string, path2: string) => {
  const segments1 = path1.split('/').filter(Boolean);
  const segments2 = path2.split('/').filter(Boolean);

  let commonLength = 0;
  while (commonLength < segments1.length && commonLength < segments2.length && segments1[commonLength] === segments2[commonLength]) {
      commonLength++;
  }

  const distance = (segments1.length - commonLength) + (segments2.length - commonLength);
  return distance;
}