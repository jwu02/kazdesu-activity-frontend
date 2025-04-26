import { getBlogs } from '@/lib/actions/notion.actions'
import Blogs from '@/components/blog/Blogs'
import { unstable_cache } from 'next/cache'

const getCachedBlogs = unstable_cache(
  async () => {
    const blogs = await getBlogs()
    return blogs.filter((blog): blog is NonNullable<typeof blog> => blog !== null)
  },
  ['blogs'],
  { revalidate: 3600 } // Revalidate every hour
)

export default async function BlogPage() {
  const blogs = await getCachedBlogs()
  return <Blogs blogs={blogs} />
}