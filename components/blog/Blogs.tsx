"use clients"

import { use } from 'react'
import { getBlogs } from '@/lib/actions/notion.actions'
import Link from 'next/link'
import { RxFileText } from 'react-icons/rx'
import TagsList from '@/components/projects/TagsList'
import { IoIosArrowForward } from 'react-icons/io'

const Blogs = () => {
  const blogs = use(getBlogs())

  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li key={blog.id} className="card-blog">
          <Link
            href={`/blog/${blog.id}`}
            className="relative flex gap-1 group p-5 transition-all duration-300 hover:bg-accent"
          >
            <div className="w-1/4">
              <RxFileText className="text-4xl text-theme-sololv" />
            </div>

            <div className="flex flex-col w-3/4">
              <div className="flex items-start">
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
        </li>
      ))}
    </ul>
  )
}

export default Blogs