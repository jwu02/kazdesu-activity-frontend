import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import * as d3 from 'd3'
import { MS_IN_DAY } from "@/lib/constants"
import { PcActivity } from "./types"

import BulletedListItem from "@/components/notion/BulletedListItem"
import Code from "@/components/notion/Code"
import Heading1 from "@/components/notion/Heading1"
import Heading2 from "@/components/notion/Heading2"
import Image from "@/components/notion/Image"
import Paragraph from "@/components/notion/Paragraph"
import Toggle from "@/components/notion/Toggle"
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// activity chart utils

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


// notion utils

export function getPlainTextFromRichTextArray(richTextArray: RichTextItemResponse[]) {
  return richTextArray.map((text) => text.plain_text).join("")
}

// component map
export const blockTypeToComponentMap = {
  'bulleted_list_item': BulletedListItem,
  'code': Code,
  'heading_1': Heading1,
  'heading_2': Heading2,
  'image': Image,
  'paragraph': Paragraph,
  'toggle': Toggle,
}