import KnowledgeGraph from "@/components/knowledge/KnowledgeBaseDashboard"
import ActivityDashboard from "@/components/activity/ActivityDashboard"

export default async function Home() {
  return (
    <>
      <KnowledgeGraph />
      <ActivityDashboard />
    </>
  )
}
