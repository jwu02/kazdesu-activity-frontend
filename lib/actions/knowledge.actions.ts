"use server"

// import { remark } from 'remark'
// import html from 'remark-html'
import { extractMarkdownLinks, getDirectoryFromPath, getFilenameFromPath } from '@/lib/utils'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN_OBSIDIAN_BACKUP
const GITHUB_API_BASE = 'https://api.github.com'

const REPO_NAME = 'obsidian-backup'
const BRANCH = 'master'
const PUBLIC_NOTES_DIR = 'CardsPublic/'

const BASE_NODE_RADIUS = 5

export const fetchPublicFilePaths = async () => {
  // https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api
  const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`
    }
  })
  const data = await response.json()

  // Extract file paths
  return data.tree
    .filter(item => // Filter for Markdown files
      item.type === 'blob' && 
      item.path.startsWith(PUBLIC_NOTES_DIR) && 
      item.path.endsWith('.md'))
    .map(item => item.path)
}

export const fetchFileContent = async (url: string) => {
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
  
  return res.text()
}

// export const processMarkdownContent = async (content) => {
//   const processedContent = await remark().use(html).process(content);
//   return processedContent.toString();
// };

export const fetchKnowledgeGraphData = async () => {
  let nodes = []
  let links = []

  const publicFilePaths = await fetchPublicFilePaths()

  for (const path of publicFilePaths) {
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${encodeURIComponent(path)}`
    const fileContent = await fetchFileContent(url)
    // const htmlContent = await processMarkdownContent(fileContent)

    // Compute node object
    const nodeObj = {
      id: getFilenameFromPath(path),
      group: getDirectoryFromPath(path),
      radius: BASE_NODE_RADIUS,
      isLeaf: true,
      connectedNodes: []
      // content: htmlContent,
    }
    nodes.push(nodeObj)

    // Extract markdown links/relationships from the HTML content
    const markdownLinks = extractMarkdownLinks(fileContent)

    // Create links based on extracted markdown links
    markdownLinks.forEach(link => {
      // Add a link from the current file to each of the extracted markdown links
      links.push({
        source: nodeObj.id,
        target: link
      })
    })
  }

  return processKnowledgeGraphData(nodes, links)
}

const processKnowledgeGraphData = async (nodes, links) => {
  // Filter out links with invalid relation targets, within public knowledge
  const validLinks = links.filter(link => 
    nodes.find(node => node.id === link.source) && nodes.find(node => node.id === link.target)
  )

  nodes.forEach(node => {
    const outBoundLinks = validLinks.filter(link => link.source === node.id)
    const inBoundLinks = validLinks.filter(link => link.target === node.id)

    // Get the target nodes of out-bound links from current node
    const outBoundTargets = outBoundLinks.map(link => link.target)
    // Get the sources of in-bound links to current node
    const inBoundSources = inBoundLinks.map(link => link.source)

    // Use set to get unique connected nodes since relationships may be biredirectional
    const connectedNodesSet = new Set(outBoundTargets.concat(inBoundSources))
    const numConnectedNodes = connectedNodesSet.size

    // My definition of a leaf node here is one with only 1 connected node
    node.isLeaf = numConnectedNodes <= 1
    node.radius += Math.pow(numConnectedNodes, 0.7)
    node.connectedNodes = Array.from(connectedNodesSet)
  })

  return { nodes: nodes, links: validLinks }
}
