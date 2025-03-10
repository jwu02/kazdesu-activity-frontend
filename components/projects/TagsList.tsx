"use client"

import { Badge } from "@/components/ui/badge"

interface TagsListProps {
  tags: string[]
}

const TagsList = ({ tags }: TagsListProps) => {
  const sortedTags = tags.sort((a, b) => a.localeCompare(b))

  return (
    <div className="flex flex-wrap gap-1">
      {sortedTags.map((tag) => (
        <Badge key={tag} className="rounded-none">{tag}</Badge>
      ))}
    </div>
  )
}

export default TagsList