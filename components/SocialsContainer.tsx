"use client"

import React from 'react'
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'

const SocialsContainer = () => {
  const socials = [
    // {
    //   name: 'LinkedIn',
    //   className: `group-hover:text-linkedin`,
    //   icon: FaLinkedin,
    //   url: 'https://www.linkedin.com/in/jwu31',
    // },
    {
      name: 'Discord @kazdesu',
      className: 'group-hover:text-discord group-hover:animate-[spin_1.5s_ease-in-out_infinite]',
      icon: FaDiscord,
      url: 'https://discord.com/channels/@me',
    },
    {
      name: 'X @kazdesu21',
      className: '',
      icon: FaXTwitter,
      url: 'https://x.com/kazdesu21',
    },
    {
      name: 'GitHub @jwu02',
      className: '',
      icon: FaGithub,
      url: 'https://github.com/jwu02',
    },
  ]

  return (
    <>
      {
        socials.map((social, index) => (
          <TooltipProvider key={index} delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="group p-1 cursor-pointer"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className={`opacity-70 group-hover:opacity-100 text-2xl ${social.className}`} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-base font-medium">
                  {social.name}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))
      }
    </>
  )
}

export default SocialsContainer