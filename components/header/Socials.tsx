"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { FaDiscord, FaGithub, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";

const socials = [
  {
    name: 'LinkedIn',
    className: `group-hover:text-linkedin`,
    icon: FaLinkedin,
    url: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`,
    handle: process.env.NEXT_PUBLIC_LINKEDIN,
  },
  {
    name: 'Discord',
    className: 'group-hover:text-discord group-hover:animate-[spin_1.5s_ease-in-out_infinite]',
    icon: FaDiscord,
    url: 'https://discord.com/channels/@me',
    handle: process.env.NEXT_PUBLIC_DISCORD,
  },
  {
    name: 'X',
    className: '',
    icon: FaXTwitter,
    url: `https://x.com/${process.env.NEXT_PUBLIC_TWITTER}`,
    handle: process.env.NEXT_PUBLIC_TWITTER,
  },
  {
    name: 'GitHub',
    className: '',
    icon: FaGithub,
    url: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB}`,
    handle: process.env.NEXT_PUBLIC_GITHUB,
  },
  {
    name: 'YouTube',
    className: '',
    icon: FaYoutube,
    url: `https://www.youtube.com/${process.env.NEXT_PUBLIC_YOUTUBE}`,
    handle: process.env.NEXT_PUBLIC_YOUTUBE,
  },
  {
    name: 'TikTok',
    className: '',
    icon: FaTiktok,
    url: `https://www.tiktok.com/${process.env.NEXT_PUBLIC_TIKTOK}`,
    handle: process.env.NEXT_PUBLIC_TIKTOK,
  },
  {
    name: 'WeChat',
    className: '',
    icon: IoLogoWechat,
    url: `https://www.wechat.com/${process.env.NEXT_PUBLIC_WECHAT}`,
    handle: process.env.NEXT_PUBLIC_WECHAT,
  }
];

const Socials = () => {
  return (
    <div className="flex gap-2">
      {socials
        .filter(social => social.handle) // Only show socials with defined handles
        .map((social, index) => (
          <TooltipProvider key={index} delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  className="group p-1 cursor-pointer"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className={`opacity-70 group-hover:opacity-100 text-2xl ${social.className}`} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-base font-medium">
                  {social.name} @{social.handle}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))
      }
    </div>
  )
}

export default Socials