import ActivityDashboard from "@/components/activity/ActivityDashboard"
import KnowledgeGraph from "@/components/knowledge-base/KnowledgeBaseDashboard"

export const revalidate = 24*60*60 // revalidate every x seconds

export default async function Home() {
  return (
    <>
      <KnowledgeGraph />
      <ActivityDashboard />
    </>
  )
}
