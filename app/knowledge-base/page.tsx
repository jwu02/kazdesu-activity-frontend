import DisjointForceGraph from "@/components/knowledge/DisjointForceGraph"
import { fetchKnowledgeGraphData } from "@/lib/actions/knowledge.actions"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'jwoo | Knowledge Base',
  description: 'View my knowledge base',
};

export default async function KnowledgeBasePage() {
  const { nodes, links } = await fetchKnowledgeGraphData()
  
  return <DisjointForceGraph nodes={nodes} links={links} />
} 