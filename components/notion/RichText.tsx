"use client"

import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

interface RichTextProps {
  richTextArray: RichTextItemResponse[]
}

const RichText = ({ richTextArray }: RichTextProps) => {
  return richTextArray.map((segment) => {
    // const segmentStyles = [
    //   'text-inherit',
    //   segment.annotations.bold && 'font-black',
    //   segment.annotations.italic && 'italic',
    //   segment.annotations.underline && 'underline',
    //   segment.annotations.strikethrough && 'line-through',
    // ]

    // return (<span key={index} className={segmentStyles.join(' ')}>
    //   {segment.plain_text}
    // </span>)
    return <>{segment.plain_text}</>
  })
}

export default RichText