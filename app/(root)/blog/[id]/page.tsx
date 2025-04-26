import Unsupported from "@/components/notion/Unsupported"
import { getPageById } from "@/lib/actions/notion.actions"
import { blockTypeToComponentMap } from "@/lib/utils"
import { notFound } from "next/navigation"

// export const revalidate = 3600

// export async function generateStaticParams() {
//   const ids = await getAllNoteIds();
//   return ids.map((id) => ({ id }));
// }

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getPageById(params.id)
  if (!note) notFound()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{note.title}</h1>
      <div className="flex flex-col gap-2">
        {note.blocks.map((block: any) => {
          const BlockComponent = blockTypeToComponentMap[block.type] || Unsupported
          return <BlockComponent key={block.id} block={block} />
        })}
      </div>
    </div>
  )
}