"use client"

import RichText from './RichText'
import { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Heading3Props {
  block: Heading3BlockObjectResponse
}

const Heading3 = ({ block }: Heading3Props) => {
  return (
    <h3>
      ## <RichText richTextArray={block.heading_3.rich_text} />
    </h3>
  )
}

export default Heading3