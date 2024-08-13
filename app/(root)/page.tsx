import ActivityDashboard from "@/components/activity/ActivityDashboard"
import Banner from "@/components/Banner"
import KnowledgeGraph from "@/components/knowledge-base/KnowledgeBaseDashboard"

export default function Home() {
  return (
    <>
      <Banner />
      <KnowledgeGraph />
      <ActivityDashboard />
    </>
  )
}
