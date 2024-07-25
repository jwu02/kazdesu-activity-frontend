"use client"

import { getPCStatus } from '@/lib/actions/activity.actions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaCircle, FaCircleDot } from 'react-icons/fa6'

const Banner = () => {
  const intro = "hello i am tony"
  const bio = "a cs graduate from the uk, currently maidenless, jobless and soon homeless. looking for opportunities including voluntry work."
  
  return (
    <div className="flex gap-5 mb-5">
      {/* TODO get image dynamically from twitter profile + set username */}
      <Image
        alt="profile picture sourced from my X/Twitter profile"
        src="https://pbs.twimg.com/profile_images/1810680453344473088/GsowsvJ2_400x400.jpg"
        width={150}
        height={150}
      />

      <div className="flex flex-col justify-between">
        <StatusLabel />
        <h1>{intro}</h1>
        <div className="text-base">{bio}</div>
      </div>
    </div>
  )
}

export default Banner

const StatusLabel = () => {
  // ping background process on my pc to determine if online
  const [online, setOnline] = useState<boolean>(false)

  useEffect(()=> {
    const getPCResponse = async () => {
      let response = await getPCStatus()
      setOnline(response)
    }
    
    getPCResponse()
  },[])
  
  let statusLabelColor = online ? "text-cyan-500" : "text-red-500"
  
  const onlineLabel = "online"
  const offlineLabel = "probably afk touching grass"
  const onlineIcon = <FaCircle />
  const offlineIcon = <FaCircleDot />
  
  const switchStatus = () => {
    setOnline((prev) => !prev)
  }

  return (
    // why doesnt inline-block work?
    <div className={`inline-flex items-center gap-2 ${statusLabelColor}`}>
      <span className={`w-auto ${online ? "pulse-icon" : "beat-icon"}`}>
        {online ? onlineIcon : offlineIcon}
      </span>

      <span 
        className="cursor-pointer hover:opacity-80 text-base" 
        onClick={switchStatus}
      >
        {online ? onlineLabel : offlineLabel}
      </span>
    </div>
  )
}