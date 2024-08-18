import { fetchKnowledgeGraphData, fetchXFilesFromLastYCommits } from '@/lib/actions/knowledge.actions'
import DisjointForceGraph from '@/components/knowledge-base/DisjointForceGraph'
import RecentNotesContainer from './RecentNotesContainer'

const KnowledgeGraph = async () => {
  const { nodes, links } = await fetchKnowledgeGraphData()

  const newNotes = await fetchXFilesFromLastYCommits(40, 50)

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1>knowledge base</h1>
      <div className="relative group">
        <div className="hidden group-hover:block">
          <RecentNotesContainer newNotes={newNotes} />
        </div>
        
        <div className="w-full">
          <DisjointForceGraph nodes={nodes} links={links} />
        </div>
      </div>
    </div>
  )
}

export default KnowledgeGraph