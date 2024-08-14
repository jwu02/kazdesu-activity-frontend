"use server"

// import { remark } from 'remark'
// import html from 'remark-html'
import { computeDirectoryDistance, extractMarkdownLinks, getDirectoryFromPath, getFilenameFromPath } from '@/lib/utils'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN_OBSIDIAN_BACKUP
const GITHUB_API_BASE = 'https://api.github.com'

const REPO_NAME = 'obsidian-backup'
const BRANCH = 'master'

const BASE_NODE_RADIUS = 5
const BASE_LINK_STROKE_WIDTH = 2

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
    .filter(item => item.type === 'blob' && item.path.startsWith('CardsPublic/') && item.path.endsWith('.md')) // Filter for Markdown files
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
      // content: htmlContent,
    }
    nodes.push(nodeObj)

    // Extract markdown links/relationships from the HTML content
    const markdownLinks = extractMarkdownLinks(fileContent)

    // Create links based on extracted markdown links
    markdownLinks.forEach(link => {
      // Add a link from the current file to each of the extracted markdown links
      links.push({
        source: getFilenameFromPath(path),
        target: link,
        value: BASE_LINK_STROKE_WIDTH
      })
    })
  }

  return processKnowledgeGraphData(nodes, links)
}

const processKnowledgeGraphData = async (nodes, links) => {
  // Filter out links with invalid relation targets, within public knowledge
  const validLinks = links.filter(link => 
    nodes.find(node => node.id === link.source) && nodes.find(node => node.id === link.target)
  );

  // Compute distances between nodes in relationships
  validLinks.forEach(link => {
    const sourceNodeDir = nodes.find(node => node.id === link.source).group
    const targetNodeDir = nodes.find(node => node.id === link.target).group

    link.value += computeDirectoryDistance(sourceNodeDir, targetNodeDir)
  })

  nodes.forEach(node => {
    const numOutBoundLinks = validLinks.filter(link => link.source === node.id).length
    node.radius += Math.sqrt(numOutBoundLinks)
  })

  return { nodes: nodes, links: validLinks }
}
