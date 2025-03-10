"use client"

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface UnsupportedProps {
  block: BlockObjectResponse
}

const Unsupported = ({ block }: UnsupportedProps) => {
  return (
    <div>Unsupported block type: {block.type}</div>
  )
}

export default Unsupported