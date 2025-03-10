"use client"

import { fmContainerCommon, fmItemCommon } from '@/lib/constants'
import TagsList from './TagsList'
import Unsupported from '@/components/notion/Unsupported'
import { blockTypeToComponentMap } from '@/lib/utils'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { motion } from 'framer-motion'

interface Project {
  id: string;
  title: string;
  createdAt: string;
  tags: string[];
  blocks: BlockObjectResponse[];
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <motion.div variants={fmContainerCommon} initial="hidden" animate="visible" className="space-y-4 w-full">
      {projects.map((project) => (
        <motion.div key={project.id} variants={fmItemCommon} className="flex flex-col">
          <div className="flex items-start">
            <h1>{project.title}</h1>
            {/* <span className="text-sm text-gray-500 ml-auto">
              {new Date(project.createdAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              }
            </span> */}
          </div>
          
          <TagsList tags={project.tags} />

          <div>
            {project.blocks.map((block) => {
              const typedBlock = block as BlockObjectResponse
              const BlockComponent = blockTypeToComponentMap[typedBlock.type as keyof typeof blockTypeToComponentMap] || Unsupported
              return <BlockComponent key={block.id} block={typedBlock} />
            })}
          </div>
          
        </motion.div>
      ))}
    </motion.div>
  )
}
