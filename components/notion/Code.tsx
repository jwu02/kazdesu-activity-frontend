"use client"

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { CodeBlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

interface CodeProps {
  block: CodeBlockObjectResponse;
}

const Code = ({ block }: CodeProps) => {
  const code = block.code;
  const codeContent = code.rich_text.map((text) => text.plain_text ?? "").join('')
  const language = code.language ?? ''
  const caption = code.caption ? 
    code.caption.map((text: RichTextItemResponse) => text.plain_text ?? "").join('') : 
    ''

  return (
    <div>
      <SyntaxHighlighter language={language} style={atomOneDark}>
        {codeContent}
      </SyntaxHighlighter>
      {caption && <p className="text-sm text-gray-500 mt-2">{caption}</p>}
    </div>
  )
}

export default Code