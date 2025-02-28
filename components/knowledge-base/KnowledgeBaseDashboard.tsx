import { fetchKnowledgeGraphData } from '@/lib/actions/knowledge.actions'
import DisjointForceGraph from '@/components/knowledge-base/DisjointForceGraph'

const KnowledgeGraph = async () => {
  const { nodes, links } = await fetchKnowledgeGraphData()

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1>knowledge base</h1>
      <div className="w-full">
        <DisjointForceGraph nodes={nodes} links={links} />
      </div>
    </div>
  )
}

export default KnowledgeGraph