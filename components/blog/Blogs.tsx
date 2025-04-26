"use client"

import Link from 'next/link'
import TagsList from '@/components/projects/TagsList'
import { IoIosArrowForward } from 'react-icons/io'
import Image from 'next/image'
import { motion } from "framer-motion"
import { fmContainerCommon, fmItemCommon } from '@/lib/constants/styles'

interface Blog {
  id: string;
  title: string;
  createdAt: string;
  tags: string[];
  preview: string;
}

interface BlogsProps {
  blogs: Blog[];
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <motion.ul variants={fmContainerCommon} initial="hidden" animate="visible">
      {blogs.map((blog) => (
        <motion.li key={blog.id} variants={fmItemCommon} className="card-blog">
          <Link
            href={`/blog/${blog.id}`}
            className="relative flex max-sm:flex-wrap max-sm:justify-center gap-6 group p-5 transition-all duration-300 hover:bg-accent"
          >
            <div className="w-48 h-40 border flex items-center justify-center relative">
              <Image
                src="/file.svg"
                alt="Image placeholder"
                width={50}
                height={50}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-4 items-start">
                <div className="text-xl">{blog.title}</div>
                <span className="text-sm text-gray-500 ml-auto">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }
                </span>
              </div>
              <div className="text-gray-500">{blog.preview}</div>
              <div className="mt-1">
                <TagsList tags={blog.tags} />
              </div>
              <div className="flex gap-2 items-center justify-center read-more font-medium mr-4 text-theme-sololv">
                <span>read more</span><span><IoIosArrowForward /></span>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default Blogs