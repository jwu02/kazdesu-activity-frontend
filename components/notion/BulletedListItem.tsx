"use client"

import RichText from './RichText'
import { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

interface BulletedListItemProps {
  block: BulletedListItemBlockObjectResponse
}

const BulletedListItem = ({ block }: BulletedListItemProps) => {
  const bulletedListItem = block.bulleted_list_item

  return (
    <ul className="pl-5 list-disc">
      <li>
        <RichText richTextArray={bulletedListItem.rich_text} />
        {/* render children */}
      </li>
    </ul>
  )
}

export default BulletedListItem