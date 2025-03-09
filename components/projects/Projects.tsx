"use client"

import { getProjects } from '@/lib/actions/notion.actions'
import TagsList from './TagsList'
import Unsupported from '@/components/notion/Unsupported'
import { use } from 'react'
import { blockTypeToComponentMap } from '@/lib/utils'

export default function Projects() {
  const projects = use(getProjects())

  return (
    <div className="space-y-4 w-full">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col">
          <div className="flex items-start">
            <h1>{project.title}</h1>
            <span className="text-sm text-gray-500 ml-auto">
              {new Date(project.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              }
            </span>
          </div>
          
          <TagsList tags={project.tags} />

          <div>
            {project.blocks.map((block) => {
              const BlockComponent = blockTypeToComponentMap[block.type] || Unsupported
              return <BlockComponent key={block.id} block={block} />
            })}
          </div>
          
        </div>
      ))}
    </div>
  )
}
