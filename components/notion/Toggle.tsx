"use client"

import { ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface ToggleProps {
  block: ToggleBlockObjectResponse
}

const Toggle = ({ block }: ToggleProps) => {
  const toggle = block.toggle
  
  return (
    <div>
      Toggle Block
    </div>
  )
}

export default Toggle