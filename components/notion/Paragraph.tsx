"use client"

import RichText from './RichText'
import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface ParagraphProps {
  block: ParagraphBlockObjectResponse
}

const Paragraph = ({ block }: ParagraphProps) => {
  return (
    <p>
      <RichText richTextArray={block.paragraph.rich_text} />
    </p>
  )
}

export default Paragraph