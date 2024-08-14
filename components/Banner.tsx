"use client"

import { getPCStatus } from '@/lib/actions/activity.actions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaCircle, FaCircleDot } from 'react-icons/fa6'

// import dynamic from 'next/dynamic';

// const AsciiArtDisplay = dynamic(() => import('@/components/AsciiArtDisplay'), {
//   ssr: false, // This ensures the component is only rendered on the client side
// });

const Banner = () => {
  const intro = "hello i am tony"
  const bio = "a cs graduate from the uk. studied cs to learn build cool things, now i am jobless, maidenless and soon homeless"
  const pfpImgSrc = "/pfp.jpg"

  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <Image
        className="rounded-lg mx-auto sm:mx-0"
        alt="profile picture"
        src={pfpImgSrc}
        width={150}
        height={150}
      />

      {/* <AsciiArtDisplay imageUrl={pfpImgSrc} /> */}

      <div className="flex flex-col justify-between gap-2">
        <div className="mx-auto sm:mx-0">
          <StatusLabel />
        </div>
        <div className="text-lg">{intro}</div>
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