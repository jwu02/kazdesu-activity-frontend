'use server'

import { Link, Node } from "@/lib/types"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN_OBSIDIAN_BACKUP
const GITHUB_API_BASE = 'https://api.github.com'

const REPO_NAME = 'obsidian-backup'
const GRAPH_DATA_FILE = 'graph_data.json'

const BASE_NODE_RADIUS = 5

export const fetchKnowledgeGraphData = async () => {
  // https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api
  const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${GRAPH_DATA_FILE}`
  const res = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw'
    }
  })

  if (res.status === 404) {
    throw new Error(`Not Found: ${url}`)
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  }
  
  const graphData = await res.json()
  // console.log(graphData)
  return processKnowledgeGraphData(graphData.nodes, graphData.links)
}

const processKnowledgeGraphData = async (nodes: Node[], links: Link[]) => {
  // Filter out links with invalid relation targets, within public knowledge
  const validLinks = links.filter(link => 
    nodes.find(node => node.id === link.source) && nodes.find(node => node.id === link.target)
  )

  nodes.forEach(node => {
    // Assign default values to each node
    node.isLeaf = false
    node.radius = 0
    node.connectedNodes = []

    const outBoundLinks = validLinks.filter(link => link.source === node.id)
    const inBoundLinks = validLinks.filter(link => link.target === node.id)

    // Get the target nodes of out-bound links from current node
    const outBoundTargets = outBoundLinks.map(link => typeof link.target === 'string' ? link.target : link.target.id)
    // Get the sources of in-bound links to current node
    const inBoundSources = inBoundLinks.map(link => typeof link.source === 'string' ? link.source : link.source.id)

    // Use set to get unique connected nodes since relationships may be biredirectional
    const connectedNodesSet = new Set(outBoundTargets.concat(inBoundSources))
    const numConnectedNodes = connectedNodesSet.size

    // My definition of a leaf node here is one with only 1 connected node
    node.isLeaf = numConnectedNodes <= 1
    node.radius += BASE_NODE_RADIUS + Math.pow(numConnectedNodes, 0.7)
    node.connectedNodes = Array.from(connectedNodesSet)
  })

  return { nodes: nodes, links: validLinks }
}
