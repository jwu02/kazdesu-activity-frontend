"use client"

import RichText from './RichText'
import { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

interface Heading2Props {
  block: Heading2BlockObjectResponse
}

const Heading2 = ({ block }: Heading2Props) => {
  return (
    <h2>
      ## <RichText richTextArray={block.heading_2.rich_text} />
    </h2>
  )
}

export default Heading2