import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const RecentNotesScrollArea = ({ newNotes }) => {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-1 p-3">
        <h4 className="mx-auto text-sm font-medium">recent notes</h4>
        <Separator />
        {newNotes.map((note)=>
          <p key={note} className="bg-accent/60 p-1 px-2 rounded-lg cursor-pointer hover:scale-105">
            {note}
          </p>
        )}
      </div>
    </ScrollArea>
  )
}

export default RecentNotesScrollArea