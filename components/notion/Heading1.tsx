"use client"

import RichText from './RichText'
import { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

interface Heading1Props {
  block: Heading1BlockObjectResponse
}

const Heading1 = ({ block }: Heading1Props) => {
  return (
    <h1>
      # <RichText richTextArray={block.heading_1.rich_text} />
    </h1>
  )
}

export default Heading1