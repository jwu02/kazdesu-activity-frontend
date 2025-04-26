import { getProjects } from '@/lib/actions/notion.actions'
import Projects from '@/components/projects/Projects'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export default async function ProjectsPage() {
  const projects = await getProjects()
  const filteredProjects = projects
    .filter((project): project is NonNullable<typeof project> => project !== null)
    .map(project => ({
      ...project,
      blocks: project.blocks as BlockObjectResponse[]
    }))

  return <Projects projects={filteredProjects} />
}
