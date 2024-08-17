import DisjointForceGraph from '@/components/knowledge-base/DisjointForceGraph'

const KnowledgeGraph = ({ nodes, links }) => {

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1>knowledge base</h1>
      <div className="flex gap-5">
        <div className="w-full">
          <DisjointForceGraph nodes={nodes} links={links} />
        </div>
      </div>
    </div>
  )
}

export default KnowledgeGraph