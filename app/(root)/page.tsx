import ActivityDashboard from "@/components/activity/ActivityDashboard"
import Banner from "@/components/Banner"
import KnowledgeGraph from "@/components/knowledge-base/KnowledgeBaseDashboard"
import { fetchKnowledgeGraphData } from "@/lib/actions/knowledge.actions"

export const revalidate = 24*60*60 // revalidate every x seconds

export default async function Home() {
  const { nodes, links } = await fetchKnowledgeGraphData()

  return (
    <>
      <Banner />
      <KnowledgeGraph nodes={nodes} links={links} />
      <ActivityDashboard />
    </>
  )
}
