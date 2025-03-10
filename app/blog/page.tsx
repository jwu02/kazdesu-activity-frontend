import { getBlogs } from '@/lib/actions/notion.actions'
import Blogs from '@/components/blog/Blogs'

export default async function BlogPage() {
  const blogs = await getBlogs()
  const filteredBlogs = blogs.filter((blog): blog is NonNullable<typeof blog> => blog !== null)

  return <Blogs blogs={filteredBlogs} />
}