import { PcActivity } from "./constants/activity";

export const filterLastXMs = (x: number, data: PcActivity[]): PcActivity[] => {
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