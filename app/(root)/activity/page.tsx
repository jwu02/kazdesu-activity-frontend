import ActivityDashboard from "@/components/activity/ActivityDashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "jwoo | PC Activity",
  description: "View my computer activity and usage patterns",
}

export default function ActivityPage() {
  return (
    <ActivityDashboard />
  )
} 