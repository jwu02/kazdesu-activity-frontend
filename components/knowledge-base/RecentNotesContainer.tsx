"use client"

import React, { useState } from 'react'
import RecentNotesScrollArea from '@/components/knowledge-base/RecentNotesScrollArea'

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"

const RecentNotesContainer = ({ newNotes }) => {
  const [notesCollapsed, setNotesCollapsed] = useState(true)

  const CollapseNotesIcon = notesCollapsed ? IoMdArrowDropright : IoMdArrowDropleft

  return (
    <div className="!absolute h-[96%] top-2 left-2 z-50 flex items-center gap-1">
      {!notesCollapsed &&
        <div className="bg-muted/60 rounded-lg h-full">
          <RecentNotesScrollArea newNotes={newNotes} />
        </div>
      }

      <div className="bg-muted/80 hover:bg-muted-foreground/80 h-10 w-5 p-0 flex justify-center items-center rounded-lg cursor-pointer"
        onClick={()=>setNotesCollapsed(prev=>!prev)}
      >
        <CollapseNotesIcon className="w-full h-full" />
      </div>
    </div>
  )
}

export default RecentNotesContainer