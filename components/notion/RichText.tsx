"use client"

import React from "react"
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

export interface RichTextProps {
  richTextArray: RichTextItemResponse[]
}

const RichText = ({ richTextArray }: RichTextProps) => {
  return richTextArray.map((segment, index) => {
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
    return <React.Fragment key={index}>{segment.plain_text}</React.Fragment>
  })
}

export default RichText