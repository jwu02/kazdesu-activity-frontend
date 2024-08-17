"use client"

import DisjointForceGraph from '@/components/knowledge-base/DisjointForceGraph'
import { PiLockKeyFill, PiLockKeyOpenFill } from 'react-icons/pi'
import { useState } from 'react'

const KnowledgeGraph = ({ nodes, links }) => {
  const [lockZoom, setLockZoom] = useState<boolean>(false)
  const LockIcon = lockZoom ? PiLockKeyFill : PiLockKeyOpenFill

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1>knowledge base</h1>
      <div className="flex gap-5">
        <div className="w-full relative">
          <div className="absolute z-50 bg-muted/80 p-1 rounded-lg flex flex-col right-2 top-2">
            <LockIcon size={30} onClick={()=>setLockZoom((prev)=>!prev)} className={`p-[5px] rounded-lg cursor-pointer ${lockZoom && 'bg-background'}`} />
          </div>
          <div className="w-full relative">
            <DisjointForceGraph nodes={nodes} links={links} lockZoom={lockZoom} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraph