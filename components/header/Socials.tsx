"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { socials } from "@/lib/constants"
import Link from 'next/link'

const Socials = () => {
  return (
    <div className="flex gap-2">
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
    </div>
  )
}

export default Socials